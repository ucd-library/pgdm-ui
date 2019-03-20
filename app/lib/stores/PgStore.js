const {BaseStore} = require('@ucd-lib/cork-app-utils');

class PgStore extends BaseStore {

  constructor() {
    super();

    this.data = {
      connection : {},
      services : {}
    }

    this.events = {
      PG_SERVICE_UPDATE : 'pg-service-update',
      PG_CONNECTION_UPDATE : 'pg-connection-update'
    }

    this.setPgDisconnected();
  }

  setPgConnecting() {
    this._setPgConnectState({state: 'connecting'});
  }

  setPgConnected() {
    this._setPgConnectState({state: 'connected'});
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