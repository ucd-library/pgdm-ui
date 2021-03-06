import { LitElement } from 'lit-element';
import render from "./app-connection-header.tpl.js"

import "@polymer/iron-icons"
import "@polymer/iron-icons/device-icons"
import "@polymer/iron-icons/social-icons"

export default class AppConnectionHeader extends Mixin(LitElement)
  .with(LitCorkUtils) {

  static get properties() {
    return {
      connected : {type: Boolean},
      host : {type: String},
      user : {type: String},
      dbname : {type: String},
      port : {type: String},
      serviceName : {type: String},
      showPopup : {type: Boolean}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);

    this.host = '';
    this.user = '';
    this.dbname = '';
    this.port = '';
    this.serviceName = '';
    this.showPopup = false;

    this._injectModel('PgModel');
  }

  _onDisconnectClicked() {
    this.PgModel.disconnect();
  }

  _onPgConnectionUpdate(e) {
    if( e.state === 'connected' ) {
      this.connected = true;
      this.host = e.payload.host;
      this.user = e.payload.user;
      this.dbname = e.payload.dbname;
      this.port = e.payload.port;
      this.serviceName = e.payload.name || e.payload.host;
    } else {
      this.connected = false;
      this.host = '';
      this.user = '';
      this.dbname = '';
      this.port = '';
      this.serviceName = '';
    }
  }

  /**
   * @method _onCloseConnectionClicked
   * @description bound to disconnect button click event
   */
  _onCloseConnectionClicked() {
    this.PgModel.disconnect();
    this.showPopup = false;
  }

  /**
   * @method _onTogglePopupClick
   * @description bound to click event for main header bar
   */
  _onTogglePopupClick() {
    this.showPopup = !this.showPopup;
  }

}

customElements.define('app-connection-header', AppConnectionHeader);
