const {BaseStore} = require('@ucd-lib/cork-app-utils');

class PgdmStore extends BaseStore {

  constructor() {
    super();

    this.data = {
      insert : {},
      list : {},
      delete : {}
    }

    this.events = {
      PGDM_INSERT_UPDATE : 'pgdm-insert-update',
      PGDM_LIST_UPDATE : 'pgdm-list-update',
      PGDM_DELETE_UPDATE : 'pgdm-delete-update'
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
      state : this.STATE.DELETED,
      error, source
    });
  }

  _setDeleteState(state) {
    this.data.delete = state;
    this.emit(this.events.PGDM_DELETE_UPDATE, state);
  }

}

module.exports = new PgdmStore();