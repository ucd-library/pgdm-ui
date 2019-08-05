import { LitElement } from 'lit-element';
import render from "./app-page-manage-connections.tpl.js"


export default class AppPageManageConnections extends Mixin(LitElement)
  .with(LitCorkUtils) {

  static get properties() {
    return {
      services : {type: Array}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);
  
    this.services = [];
    this.servicesMap = {};

    this._injectModel('PgModel', 'AppStateModel');
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
      services.push(service);
    }
    this.services = services;
  }

  /**
   * @method _onEditClicked
   * @description bound to edit icon click event
   */
  _onEditClicked(e) {
    let index = parseInt(e.currentTarget.getAttribute('index'));
    let service = this.services[index];
    this.dispatchEvent(
      new CustomEvent(
        'edit-connection', {detail: service}
      )
    );
  }

  /**
   * @method _onDeleteClicked
   * @description bound to delete icon click event
   */
  _onDeleteClicked(e) {
    let index = parseInt(e.currentTarget.getAttribute('index'));
    let service = this.services[index];

    if( !confirm(`Are you sure you want to delete connection: ${service.name}?`) ) return;

    this.PgModel.removeService(service.name);
  }

  _onNewClicked() {
    this.AppStateModel.setWindowLocation('new-connection');
  }

  _onCancelClicked() {
    this.AppStateModel.setWindowLocation('connect');
  }

}

customElements.define('app-page-manage-connections', AppPageManageConnections);
