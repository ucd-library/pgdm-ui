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

  async _loadUids(e) {
    if( e.state !== 'connected' ) return;

    this.store.onTablesLoading();
    try {
      let tables = await model.loadUids();
      this.store.onTablesLoaded(tables);
    } catch(e) {
      this.store.onTablesError(e);
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
    return this.store.data.insert;
  }

  async tables() {

  }

  async list(query) {
    if( query.source ) query.source = '%'+query.source+'%';
    if( query.view ) query.view = '%'+query.view+'%';

    this.store.onListStart(query);
    try {
      let result = await model.list(query.source, query.view);
      this.store.onListComplete(query, result);
    } catch(e) {
      this.store.onListError(query, e);
    }
    return this.store.data.list;
  }

  async delete(source) {
    this.store.onDeleteStart(source)
    try {    
      await model.delete(source);
      this.store.onDeleteComplete(source);
    } catch(e) {
      this.store.onDeleteError(source, e);
    }
    return this.store.data.delete;
  }

}

model.exports = new PgdmModel();