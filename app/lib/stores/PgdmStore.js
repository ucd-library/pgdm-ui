const {BaseStore} = require('@ucd-lib/cork-app-utils');

class PgdmStore extends BaseStore {

  constructor() {
    super();

    this.data = {
      exportCsv : {},
      insert : {},
      update : {},
      list : {},
      delete : {},
      tables : {}
    }

    this.events = {
      PGDM_INSERT_UPDATE : 'pgdm-insert-update',
      PGDM_UPDATE_UPDATE : 'pgdm-update-update',
      PGDM_LIST_UPDATE : 'pgdm-list-update',
      PGDM_DELETE_UPDATE : 'pgdm-delete-update',
      PGDM_TABLES_UPDATE : 'pgdm-tables-update',
      PGDM_EXPORT_CSV_UPDATE : 'pgdm-export-csv-update'
    }
  }

  // INSERT
  onInsertStart() {
    this._setInsertState({state: 'started'});
  }

  onInsertUpdate(e) {
    this._setInsertState({
      state: 'inserting',
      payload : e
    });
  }

  onInsertEnd(e) {
    this._setInsertState({
      state: 'complete'
    });
  }

  onInsertError(e) {
    this._setInsertState({
      state : this.STATE.ERROR,
      error : e
    });
  }

  _setInsertState(state) {
    this.data.insert = state;
    this.emit(this.events.PGDM_INSERT_UPDATE, state);
  }

  // UPDATE
  onUpdateStart() {
    this._setUpdateState({state: 'started'});
  }

  onUpdateUpdate(e) {
    this._setUpdateState({
      state: 'updating',
      payload : e
    });
  }

  onUpdateEnd(e) {
    this._setUpdateState({
      state: 'complete'
    });
  }

  onUpdateError(e) {
    this._setUpdateState({
      state : this.STATE.ERROR,
      error : e
    });
  }

  _setUpdateState(state) {
    this.data.update = state;
    this.emit(this.events.PGDM_UPDATE_UPDATE, state);
  }

  // LIST
  onListStart(query) {
    this._setListState({
      state: this.STATE.LOADING, 
      query
    });
  }

  onListComplete(query, result) {
    this._setListState({
      state: this.STATE.LOADED, 
      query,
      payload: result
    });
  }

  onListError(query, error) {
    this._setListState({
      state: this.STATE.ERROR, 
      query, error
    });
  }

  _setListState(state) {
    this.data.list = state;
    this.emit(this.events.PGDM_LIST_UPDATE, state);
  }

  // DELETE
  onDeleteStart(source) {
    this._setDeleteState({
      state : this.STATE.DELETING,
      source
    });
  }

  onDeleteComplete(source) {
    this._setDeleteState({
      state : this.STATE.DELETED,
      source
    });
  }

  onDeleteError(source, error) {
    this._setDeleteState({
      state : this.STATE.ERROR,
      error, source
    });
  }

  _setDeleteState(state) {
    this.data.delete = state;
    this.emit(this.events.PGDM_DELETE_UPDATE, state);
  }

  // Export
  onExportCsvStart(source, filepath) {
    this._setExportCsvState({
      state : 'exporting',
      source, filepath
    });
  }

  onExportCsvComplete(source, filepath, payload) {
    this._setExportCsvState({
      state : 'exported',
      source, filepath,
      payload
    });
  }

  onExportCsvError(source, filepath, error) {
    this._setExportCsvState({
      state : this.STATE.ERROR,
      error, source, filepath
    });
  }

  _setExportCsvState(state) {
    this.data.exportCsv = state;
    this.emit(this.events.PGDM_EXPORT_CSV_UPDATE, state);
  }

  // TABLES
  onTablesLoading() {
    this._setTablesState({
      state : this.STATE.LOADING
    });
  }

  onTablesLoaded(tables) {
    this._setTablesState({
      state : this.STATE.LOADED,
      payload : tables
    });
  }

  onTablesError(error) {
    this._setTablesState({
      state : this.STATE.ERROR,
      error
    });
  }

  _setTablesState(state) {
    this.data.tables = state;
    this.emit(this.events.PGDM_TABLES_UPDATE, state);
  }

}

module.exports = new PgdmStore();