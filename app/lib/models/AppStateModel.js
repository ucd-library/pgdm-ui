const {AppStateModel} = require('@ucd-lib/cork-app-state');
const AppStateStore = require('../stores/AppStateStore');
const queryString = require("query-string");

class ImplAppStateModel extends AppStateModel {

  constructor() {
    super();
    this.store = AppStateStore;

    window.addEventListener('hashchange', () => this._setLocation());
    this.EventBus.on('pg-connection-update', e => {
      if( e.state === 'connected' ) this.setWindowLocation('upload');
      else if( e.state === 'disconnected' ) this.setWindowLocation('connect');
    });
    
    this._setLocation();
  }

  _setLocation() {
    this.set({
      location : {
        pathname : window.location.hash.replace(/^#/, ''),
        path : window.location.hash.replace(/^#/, '')
          .replace(/(^\/|\/$)/g, '')
          .split('/')
          .filter(part => part ? true : false)
      }
    });
  }

  set(update) {
    if( update.location ) {
      let page = update.location.path.length ? update.location.path[0] : 'home';
      update.location.page = page;
    }

    return super.set(update);
  }

  setWindowLocation(location) {
    window.location.hash = location;
  }

}

module.exports = new ImplAppStateModel();