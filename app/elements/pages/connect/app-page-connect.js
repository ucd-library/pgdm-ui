import { LitElement, html } from 'lit-element';
import render from "./app-page-connect.tpl.js"
import clone from "clone"

import "./app-connection-list"
import "./app-connection-edit"
import "../../utils/app-dropdown"
import "../../utils/app-error-panel"

export default class AppPageConnect extends Mixin(LitElement)
  .with(LitCorkUtils) {

  static get properties() {
    return {
      view : {
        type : String
      },
      services : {type: Array},
      connectErrorMessage : {type: String}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);

    this._injectModel('PgModel', 'AppStateModel');

    this.view = 'list';
    this.services = [];
    this.servicesMap = {};
    this.PgModel.getServices();
  }

  /**
   * @method _onPgServiceUpdate
   * @description bound to PgStore pg-service-update event
   */
  _onPgServiceUpdate(e) {
    if( e.state !== 'deleted' && e.state !== 'loaded' ) return;
    
    if( e.state === 'deleted' ) delete this.servicesMap[e.id];
    if( e.state === 'loaded') this.servicesMap[e.id] = e.payload;

    let services = [];
    for( let key in this.servicesMap ) {
      let service = Object.assign({}, this.servicesMap[key]);
      service.name = key;
      if( this.selectedService === key ) service.selected = true;
      else service.selected = false;
      services.push(service);
    }
    this.services = services;

    // for development
    if( window.autoConnect === e.id ) {
      setTimeout(() => {
        this.PgModel.connectService(e.id);
      }, 200);
    }
  }

  _onPgConnectionUpdate(e) {
    if( e.state === 'error' ) {
      this.connectErrorMessage = e.error.message;
      return;
    }
    this.connectErrorMessage = '';
  }

  /**
   * @method _renderDropdownItem
   * @description used as renderer in app-dropdown
   */
  _renderDropdownItem(item) {
    return html`<div style="font-weight:bold;line-height:16px">${item.name}</div>
    <div style="font-size: 12px; font-style:italic">
      Host: ${item.host}, User: ${item.user}
    </div>`;
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

  _onConnectClicked() {
    let selectedItem = this.byId('dropdown').selectedItem;
    if( !selectedItem ) return;
    this.PgModel.connectService(selectedItem.name);
  }

  _onManageClicked() {
    this.AppStateModel.setWindowLocation('manage-connections');
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
    this.AppStateModel.setWindowLocation('new-connection');
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