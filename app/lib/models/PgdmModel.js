const {model, csv} = require('@ucd-lib/pgdm');
const {BaseModel} = require('@ucd-lib/cork-app-utils');
const PgdmStore = require('../stores/PgdmStore');
const PgStore = require('../stores/PgStore');

class PgdmModel extends BaseModel {

  constructor() {
    super();
    this.store = PgdmStore;

    this.register('PgdmModel');

    PgStore.EventBus.on(PgStore.events.PG_CONNECTION_UPDATE, (e) => this._loadUids(e));

    model.on('insert-start', () => this.store.onInsertStart());
    model.on('insert-update', e => this.store.onInsertUpdate(e));
    model.on('insert-end', () => this.store.onInsertEnd());
  }

  // TODO: fire events on this
  async _loadUids(e) {
    if( e.state !== 'connected' ) return;
    try {
      await model.loadUids();
    } catch(e) {

    }
  }

  async insert(filepath, table) {
    try {    
      let filename = model.checkAndGetFilename(filepath);
      let data = (await csv.getData(filepath)).records;
  
      await model.insert(filename, null, table, data);
    } catch(e) {
      this.store.onInsertError(e);
    }
  }

}

model.exports = new PgdmModel();