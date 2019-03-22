const {BaseStore} = require('@ucd-lib/cork-app-utils');

class PgdmStore extends BaseStore {

  constructor() {
    super();

    this.data = {
      insert : {}
    }

    this.events = {
      PGDM_INSERT_UPDATE : 'pgdm-insert-update'
    }
  }

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

}

module.exports = new PgdmStore();