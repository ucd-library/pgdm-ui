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
    return this.store.services;
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
    this.store.setPgConnecting();
    try {
      let client = await pgdm.pg.connect(config);
      client.on('end', () => {
        this.store.setPgDisconnected();
      });
      this.store.setPgConnected();
    } catch(e) {
      this.store.setPgConnectError(e);
    }
    return pgdm.pg.client;
  }

  disconnect() {
    if( !pgdm.pg.client ) return;
    return pgdm.pg.client.end();
  }
  

}

module.exports = new PgModel();