import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-connection-list.html"

import "@polymer/paper-icon-button"
import "@polymer/iron-icons"

export default class AppConnectionList extends Mixin(PolymerElement)
  .with(EventInterface) {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      services : {
        type : Array,
        value : () => []
      },
      servicesMap : {
        type : Array,
        value : () => ({})
      }
    }
  }

  constructor() {
    super();
    this._injectModel('PgModel');
  }

  _onPgServiceUpdate(e) {
    if( e.state !== 'deleted' && e.state !== 'loaded' ) return;
    
    if( e.state === 'deleted' ) delete this.servicesMap[e.id];
    if( e.state === 'loaded') this.servicesMap[e.id] = e.payload;
    
    this._renderServicesAsync();
  }

  _renderServicesAsync() {
    if( this.renderServicesTimer ) clearTimeout(this.renderServicesTimer);
    this.renderServicesTimer = setTimeout(() => {
      this.renderServicesTimer = null;
      this._renderServices();
    }, 50);
  }

  _renderServices() {
    let services = [];
    for( let key in this.servicesMap ) {
      let service = Object.assign({}, this.servicesMap[key]);
      service.name = key;
      if( this.selectedService === key ) service.selected = true;
      else service.selected = false;
      services.push(service);
    }
    this.services = services;
  }

  /**
   * @method _onEditClicked
   * @description bound to click event on edit icon
   */
  _onEditClicked(e) {
    let index = parseInt(e.currentTarget.getAttribute('index'));
    let event = new CustomEvent('edit-connection', { detail: {
      config : this.services[index],
      name : this.services[index].name
    }});
    this.dispatchEvent(event);
  }

  /**
   * @method _onConnectClicked
   * @description bound to click event on connect icon
   */
  _onConnectClicked(e) {
    let index = parseInt(e.currentTarget.getAttribute('index'));
    let event = new CustomEvent('connect', {detail: this.services[index].name});
    this.dispatchEvent(event);
  }

}

customElements.define('app-connection-list', AppConnectionList);