const pgdm = require('@ucd-lib/pgdm');
const {BaseModel} = require('@ucd-lib/cork-app-utils');
const PgStore = require('../stores/PgStore');

class PgModel extends BaseModel {

  constructor() {
    super();
    this.store = PgStore;

    this.register('PgModel');
  }

  getServices() {
    let services = pgdm.pg.getServices();
    for( let name in services ) {
      this.store.setServiceLoaded(name, services[name]);
    }
    return this.store.services;
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