import {PolymerElement, html} from "@polymer/polymer"
import template from "./pgdm-app.html"

const VERSION = require('../../package').version;

// js library
import lib from "../lib"
window.APP = lib;

// npm imports
import "@polymer/polymer"
import "@polymer/iron-pages"
import "@polymer/paper-toast"
import "@ucd-lib/cork-app-utils"

// styles
import "./style-properties"

// local imports
import "./layout/app-header"
import "./layout/app-connection-header"
import "./layout/app-left-nav"
import "./pages/connect/app-page-connect"
import "./pages/connect/app-page-edit-connection"
import "./pages/connect/app-page-manage-connections"
import "./pages/upload/app-page-upload"
import "./pages/manage/app-page-manage"
import "./pages/about/app-page-about"
import "./pages/contact/app-page-contact"

// for development
// window.autoConnect = 'graindev'

// TODO: https://github.com/electron-userland/electron-builder

const FULL_LAYOUT = ['connect', 'edit-connection', 'new-connection', 'manage-connections'];

export default class PgdmApp extends Mixin(PolymerElement)
  .with(EventInterface) {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      page : {
        type : String,
        value : 'home'
      },
      fullLayout : {
        type : Boolean,
        value : false
      }
    }
  }

  constructor() {
    super();

    this._injectModel('AppStateModel');
  }

  async ready() {
    super.ready();
    window.location.hash = 'connect';
    // setTimeout(() => window.location.hash = 'manage', 500)
   
    this._checkVersion();
  }

  async _checkVersion() {
    try {
      let res = await fetch('https://raw.githubusercontent.com/ucd-library/pgdm-ui/master/package.json');
      let data = await res.json();

      if( VERSION !== data.version ) {
        let toast = document.querySelector('paper-toast');
        toast.text = `You are running v${VERSION} of PGDM.  Current is v${data.version}`;
        toast.open();
      }
    } catch(e) {
      console.error('Failed to fetch current version', e);
    }
  }

  /**
   * @method _onAppStateUpdate
   * @description bound to app state update events
   */
  _onAppStateUpdate(e) {
    this.page = e.location.page;
    this.fullLayout = (FULL_LAYOUT.indexOf(this.page) === -1);

    // if( this.page === 'new-connection' ) {
    //   this.shadowRoot.querySelector(`[page="new-connection"]`).reset();
    // }
  }

  _onEditConnection(e) {
    let service = e.detail;
    this.shadowRoot.querySelector(`[page="edit-connection"]`).reset(service);
    this.AppStateModel.setWindowLocation('edit-connection');
  }


}

customElements.define('pgdm-app', PgdmApp);