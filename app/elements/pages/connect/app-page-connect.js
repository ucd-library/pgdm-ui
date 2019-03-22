import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-page-connect.html"

import "./app-connection-list"
import "./app-connection-edit"

export default class AppPageConnect extends Mixin(PolymerElement)
  .with(EventInterface) {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      view : {
        type : String,
        value : 'list'
      }
    }
  }

  constructor() {
    super();
    this._injectModel('PgModel');
  }

  ready() {
    super.ready();
    this.PgModel.getServices();
  }

  /**
   * @method _onEditConnection
   * @description bound to connect event from app-connection-list
   * 
   * @param {Object} e event 
   */
  _onConnect(e) {
    let serviceName = e.detail;
    this.PgModel.connectService(serviceName);
  }

  /**
   * @method _onEditConnection
   * @description bound to edit-connection event from app-connection-list
   * 
   * @param {Object} e event 
   */
  _onEditConnection(e) {
    this.view = "edit";
    this.$.editConnection.service = e.detail.config;
    this.$.editConnection.editConnection = e.detail.name;
  }

  /**
   * @method _onEditConnection
   * @description bound to edit-connection event from app-connection-list
   * 
   * @param {Object} e event 
   */
  _onCreateConnectionClicked(e) {
    this.view = "create";
    this.$.createConnection.reset();
  }

  /**
   * @method _onCancelEditConnection
   * @description bound to cancel event from app-connection-edit
   * 
   * @param {*} e 
   */
  _onCancelEditConnection(e) {
    this.view = "list";
  }

  /**
   * @method _onSaveEditConnection
   * @description bound to save event from app-connection-edit
   */
  _onSaveEditConnection() {
    this.view = "list";
  }

  /**
   * @method _onDeleteEditConnection
   * @description bound to delete event from app-connection-edit
   */
  _onDeleteEditConnection() {
    this.view = 'list';
  }

}

customElements.define('app-page-connect', AppPageConnect);