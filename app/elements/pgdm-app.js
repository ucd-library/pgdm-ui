import {PolymerElement, html} from "@polymer/polymer"
import template from "./pgdm-app.html"

// js library
import lib from "../lib"
window.APP = lib;

// npm imports
import "@polymer/polymer"
import "@polymer/iron-pages"
import "@ucd-lib/cork-app-utils"

// styles
import "./style-properties"

// local imports
import "./utils/app-nav"
import "./layout/app-header"
import "./layout/app-connection-header"
import "./layout/app-left-nav"
import "./pages/connect/app-page-connect"
import "./pages/connect/app-page-edit-connection"
import "./pages/insert/app-insert"
import "./pages/delete/app-delete"
import "./pages/upload/app-page-upload"

// for development
// window.autoConnect = 'localdev'

const FULL_LAYOUT = ['connect', 'edit-connection'];

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
    window.location.hash = 'edit-connection'
  }

  /**
   * @method _onAppStateUpdate
   * @description bound to app state update events
   */
  _onAppStateUpdate(e) {
    this.page = e.location.page;
    this.fullLayout = (FULL_LAYOUT.indexOf(this.page) === -1);
  }



}

customElements.define('pgdm-app', PgdmApp);