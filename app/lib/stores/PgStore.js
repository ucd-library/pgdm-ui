const {BaseStore} = require('@ucd-lib/cork-app-utils');

class PgStore extends BaseStore {

  constructor() {
    super();

    this.data = {
      connection : {},
      services : {},
      tables : {}
    }

    this.events = {
      PG_SERVICE_UPDATE : 'pg-service-update',
      PG_CONNECTION_UPDATE : 'pg-connection-update',
      PG_TABLES_UPDATE : 'pg-tables-update'
    }

    this.setPgDisconnected();
  }

  setPgConnecting(config) {
    this._setPgConnectState({state: 'connecting', payload: config});
  }

  setPgConnected(config) {
    this._setPgConnectState({state: 'connected', payload: config});
  }

  setPgDisconnected() {
    this._setPgConnectState({state: 'disconnected'});
  }

  setPgConnectError(error) {
    this._setPgConnectState({state: 'error', error});
  }

  _setPgConnectState(state) {
    this.data.connection = state;
    this.emit(this.events.PG_CONNECTION_UPDATE, state);
  }

  setTablesLoading() {
    this._setTablesState({
      state : this.STATE.LOADING
    });
  }

  setTablesLoaded(tables) {
    this._setTablesState({
      state : this.STATE.LOADED,
      payload : tables
    });
  }

  _setTablesState(state) {
    this.data.tables = state;
    this.emit(this.events.PG_TABLES_UPDATE, state);
  }

  setServiceLoaded(name, config) {
    this._setServiceState({
      state : this.STATE.LOADED,
      id : name,
      payload : config
    });
  }

  setServiceDeleted(name) {
    this._setServiceState({
      state : this.STATE.DELETED,
      id : name
    });
  }

  _setServiceState(state) {
    this.data.services[state.id] = state;
    this.emit(this.events.PG_SERVICE_UPDATE, state);
  }

}

module.exports = new PgStore();