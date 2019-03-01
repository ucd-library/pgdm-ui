const {AppStateModel} = require('@ucd-lib/cork-app-state');
const AppStateStore = require('../stores/AppStateStore');
const queryString = require("query-string");

class ImplAppStateModel extends AppStateModel {

  constructor() {
    super();
    this.store = AppStateStore;

    window.addEventListener('hashchange', () => this._setLocation());
    this._setLocation();
  }

  _setLocation() {
    this.set({
      location : {
        pathname : window.location.hash.replace(/^#/, ''),
        path : window.location.hash.replace(/^#/, '').replace(/(^\/|\/$)/g, '').split('/')
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

}

module.exports = new ImplAppStateModel();