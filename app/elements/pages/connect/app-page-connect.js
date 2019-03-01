import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-page-connect.html"

export default class AppPageConnect extends Mixin(PolymerElement)
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
      },
      connected : {
        type : Boolean,
        value : false
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

  _onPgServiceUpdate(e) {
    this.servicesMap[e.id] = e.payload;
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

  _onServiceClicked(e) {
    let serviceName = e.currentTarget.innerHTML;
    this.PgModel.connectService(serviceName);
  }

  _onDisconnectClicked() {
    this.PgModel.disconnect();
  }

  _onPgConnectionUpdate(e) {
    this.connected = (e.state === 'connected') ? true : false;
    console.log(e);
  }

}

customElements.define('app-page-connect', AppPageConnect);