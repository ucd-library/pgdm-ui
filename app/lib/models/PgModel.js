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
    return this.connect(config);
  }

  async connect(config) {
    this.store.setPgConnecting(config);
    try {
      let client = await pgdm.pg.connect(config);
      client.on('end', () => {
        this.store.setPgDisconnected();
      });
      this.store.setPgConnected(config, client);
      await this.getTables();
    } catch(e) {
      this.store.setPgConnectError(e);
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

    for( let table of tables ) {
      let info = await pgdm.pg.query(`select * from information_schema.columns where table_name = $1`, [table.table_view]);
      table.tableViewInfo = info;

      let triggers = await pgdm.pg.query(`select * from information_schema.triggers where event_object_table = $1`, [table.table_view]);
      for( let trigger of triggers ) {
        trigger.function = trigger.action_statement.replace(/EXECUTE PROCEDURE /, '').replace(/\(\)/, '').trim();
        if( trigger.event_manipulation === 'INSERT' ) {
          trigger.type = 'insert';
          table.insert = await this._getFunctionFromTrig(trigger.function)
        } else if( trigger.event_manipulation === 'UPDATE' ) {
          trigger.type = 'update';
          table.update = await this._getFunctionFromTrig(trigger.function)
        }
      }
      table.triggers = triggers;
    }

    this.store.setTablesLoaded(tables);
    return tables;
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
  async _getFunctionFromTrig(triggerFnName) {
    let info = await pgdm.pg.querySingle(`select * from information_schema.routines where routine_name = $1`, [triggerFnName]);
    if( !info ) return null;

    let fnName = info.routine_definition.match(/PERFORM *(\w+) *\(/);

    if( !fnName ) return null;
    fnName = fnName[1];

    let requiredViewParams = info.routine_definition.replace(/\n/g,'').match(/PERFORM *\w+ *\((.*)\);/);
    if( requiredViewParams ) {
      requiredViewParams = requiredViewParams[1]
        .split(',')
        .map(item => item.split(':=')[1].trim().replace(/NEW./,''))
    }

    info = await pgdm.pg.querySingle(`select specific_name from information_schema.routines where routine_name = $1`, [fnName]);
    return {
      requiredViewParams,
      function : fnName,
      parameters : await pgdm.pg.query('select * from information_schema.parameters where specific_name = $1', [info.specific_name])
    }
  }

}

module.exports = new PgModel();