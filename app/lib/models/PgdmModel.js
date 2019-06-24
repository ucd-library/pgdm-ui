const {model, csv} = require('@ucd-lib/pgdm');
const path = require('path');
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

    model.on('update-start', () => this.store.onUpdateStart());
    model.on('update-update', e => this.store.onUpdateUpdate(e));
    model.on('update-end', () => this.store.onUpdateEnd());
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

  async insert(filename, table, data, revision) {
    try {
      await model.insert(filename, null, table, data, {revision});
    } catch(e) {
      this.store.onInsertError(e);
    }
    return this.store.data.insert;
  }

  async update(analyzeData) {
    try {
      await model.update(analyzeData);
    } catch(e) {
      this.store.onUpdateError(e);
    }
    return this.store.data.update;
  }

  async analyzeUpdate(filename, data, revision) {
    return model.analyzeUpdate(filename, null, data, revision);
  }

  async replace(filename, table, data) {
    let resp = await this.delete(path.parse(filename).name);
    if( resp.state === 'error' ) return resp;
    return this.insert(filename, table, data);
  }

  async tables() {

  }

  async list(query) {
    query = Object.assign({}, query);
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

  async exportCsv(source, filepath) {
    this.store.onExportCsvStart(source,filepath);
    try {
      let resp = await model.exportCsv(source, filepath);
      this.store.onExportCsvComplete(source, filepath, resp);
    } catch(e) {
      this.store.onExportCsvError(source, filepath, e);
    }
    return this.store.data.exportCsv;
  }

  analyzeFile(path) {
    return model.analyzeFile(path);
  }

}

model.exports = new PgdmModel();