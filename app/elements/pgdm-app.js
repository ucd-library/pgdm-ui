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
import "./pages/insert/app-insert"
import "./pages/delete/app-delete"
import "./pages/upload/app-page-upload"

// for development
window.autoConnect = 'localdev'

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
    window.location.hash = 'connect'
  }

  /**
   * @method _onAppStateUpdate
   * @description bound to app state update events
   */
  _onAppStateUpdate(e) {
    this.page = e.location.page;
    this.fullLayout = !(this.page === 'connect');
  }



}

customElements.define('pgdm-app', PgdmApp);