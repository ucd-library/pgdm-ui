const pgdm = require('@ucd-lib/pgdm');
const {BaseModel} = require('@ucd-lib/cork-app-utils');
const PgStore = require('../stores/PgStore');
const {Client} = require('pg');

class PgModel extends BaseModel {

  constructor() {
    super();
    this.store = PgStore;

    this.register('PgModel');
  }

  async testConnection(config) {
    try {
      let client = new Client({
        user: config.user,
        host: config.host,
        database: config.dbname,
        password: config.password || '',
        port: parseInt(config.port) || 5432,
        ssl : config.sslmode === 'require' ? true : false
      });
      await client.connect();
      await client.end();
    } catch(e) {
      console.error(e);
      return false;
    }
    return true;
  }

  getServices() {
    let services = pgdm.pg.getServices();
    for( let name in services ) {
      this.store.setServiceLoaded(name, services[name]);
    }
    return this.store.data.services;
  }

  saveService(name, config, replace) {
    pgdm.pg.saveConfig(name, config, replace);

    if( replace ) {
      this.store.setServiceDeleted(replace);
    }
    this.store.setServiceLoaded(name, config);
  }

  removeService(name) {
    pgdm.pg.removeConfig(name);
    this.store.setServiceDeleted(name);
  }

  async connectService(name) {
    let config = pgdm.pg.getConfig(name);
    return this.connect(config, name);
  }

  async connect(config, serviceName) {
    config = Object.assign({}, config);
    // Never use PGSERVICE env var
    config.ignoreServiceEnv = true;

    this.store.setPgConnecting(config, serviceName);
    try {
      let client = await pgdm.pg.connect(config, serviceName);
      client.on('end', () => {
        this.store.setPgDisconnected();
      });
      await this.getTables();
      this.store.setPgConnected(config, serviceName, client);
    } catch(e) {
      this.store.setPgConnectError(e, serviceName);
      console.error(e);
    }
    return this.store.data.connection;
  }

  disconnect() {
    if( !pgdm.pg.client ) return;
    return pgdm.pg.client.end();
  }

  /**
   * @method getTables
   * @description grab the list of tables/views from the 'tables' table (required for pgdm).  This function will
   * also attempt to parse trigger -> insert/update function information attached to the views.
   * 
   * @returns {Promise}
   */
  async getTables() {
    this.store.setTablesLoading();
    let tables = await pgdm.pg.query('select * from tables');

    let schema = ((this.store.data.connection.payload || {}).pgdm || {}).schema;
    
    let oid = '';
    try {
      let result = await pgdm.pg.querySingle(`SELECT $1::regnamespace::oid;`, [schema]);
      oid = result.oid;
    } catch(e) {
      console.error(e);
    };

    for( let table of tables ) {
      let info = await pgdm.pg.query(`select * from information_schema.columns where table_name = $1 and table_schema = $2`, [table.table_view, schema]);
      table.tableViewInfo = info;

      let triggers = await pgdm.pg.query(`select * from information_schema.triggers where event_object_table = $1 and trigger_schema = $2`, [table.table_view, schema]);
      for( let trigger of triggers ) {
        trigger.function = trigger.action_statement.replace(/EXECUTE PROCEDURE /, '').replace(/\(\)/, '').trim();
        if( trigger.event_manipulation === 'INSERT' ) {
          trigger.type = 'insert';
          table.insert = await this._getFunctionFromTrig(trigger.function, oid, schema)
        } else if( trigger.event_manipulation === 'UPDATE' ) {
          trigger.type = 'update';
          table.update = await this._getFunctionFromTrig(trigger.function, oid, schema)
        }
      }
      table.triggers = triggers;
    }

    this.store.setTablesLoaded(tables);

    return tables;
  }

  getTableColumnDefinitions(name) {
    let table = this.store.data.tables.payload.find(t => t.table_view === name);
    if( !table ) throw new Error('Unknown table: '+name);

    let columns = table.tableViewInfo.map(col => {
        return {
          name: col.column_name,
          type: col.udt_name,
          pk : table.uid === col.column_name ? true : false,
          required : table.update.requiredViewParams.indexOf(col.column_name) > -1 && col.column_name !== table.uid ? true : false
        }
      })
      .filter(col => col.name !== 'source_name')


    return columns;
  }

  /**
   * @method _getFunctionFromTrig
   * @description given a trigger function name (parsed via trigger action statment), attempt to parse function params required
   * in view insert/update statement.  If this fails to parse, return null.  This should only be wired up to helper information
   * as it may fail with some setups.
   * 
   * Any improvement on this function would be welcome.
   * 
   * @param {String} triggerFnName
   * 
   * @returns {Promise} resolve to Object
   */
  async _getFunctionFromTrig(triggerFnName, oid, schema) {
    let args = [triggerFnName];
    let query = 'select prosrc from pg_proc where proname = $1';
    if( oid ) {
      args.push(oid);
      query = 'select prosrc from pg_proc where proname = $1 and pronamespace = $2';
    }
    let info = await pgdm.pg.querySingle(query, args);
    if( !info ) return null;

    if( !info.prosrc ) return null;
    let fnName = info.prosrc.match(/PERFORM *(\w+) *\(/);

    if( !fnName ) return null;
    fnName = fnName[1];

    let requiredViewParams = info.prosrc.replace(/\n/g,'').match(/PERFORM *\w+ *\((.*)\);/);
    if( requiredViewParams ) {
      requiredViewParams = requiredViewParams[1]
        .split(',')
        .map(item => item.split(':=')[1].trim().replace(/NEW./,''))
        .filter(val => val !== 'source_name')
    }

    info = await pgdm.pg.querySingle(`select specific_name from information_schema.routines where routine_name = $1 and specific_schema = $2`, [fnName, schema]);
    return {
      requiredViewParams,
      function : fnName,
      parameters : await pgdm.pg.query('select * from information_schema.parameters where specific_name = $1', [info.specific_name])
    }
  }

}

module.exports = new PgModel();