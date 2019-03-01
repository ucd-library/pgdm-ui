import {PolymerElement, html} from "@polymer/polymer"
import template from "./pgdm-app.html"

import "@polymer/polymer"
import "@polymer/iron-pages"

import "@ucd-lib/cork-app-utils"
import "../lib"

import "./pages/connect/app-page-connect"

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
      }
    }
  }

  constructor() {
    super();

    this._injectModel('AppStateModel');
  }

  async ready() {
    super.ready();
    this._onAppStateUpdate(await this.AppStateModel.get());
  }

  /**
   * @method _onAppStateUpdate
   * @description bound to app state update events
   */
  _onAppStateUpdate(e) {
    console.log(e);
    this.page = e.location.page;
  }



}

customElements.define('pgdm-app', PgdmApp);