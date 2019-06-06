import { LitElement } from 'lit-element';
import render from "./app-page-edit-connection.tpl.js"


export default class AppPageEditConnection extends Mixin(LitElement)
  .with(LitCorkUtils) {

  static get properties() {
    return {
      newConnection : {
        type: Boolean,
        attribute: 'new-connection'
      },
      error : {type: Object}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);

    this.newConnection = false;
    this.error = null;

    this._injectModel('AppStateModel', 'PgModel');
  }

  firstUpdated() {
    this.inputs = {
      name : this.byId('name'),
      host : this.byId('host'),
      port : this.byId('port'),
      username : this.byId('username'),
      password : this.byId('password'),
      database : this.byId('database'),
      pgdmschema : this.byId('pgdmschema'),
      ssl : this.byId('ssl'),
      saveNew : this.byId('save-new')
    };
  }

  reset(service={}) {
    this.originalService = service;
    this.inputs.name.value = service.name || '';
    this.inputs.host.value = service.host || 'localhost';
    this.inputs.port.value = service.port || 5432;
    this.inputs.username.value = service.user || 'postgres';
    this.inputs.password.value = service.password || '';
    this.inputs.database.value = service.dbname || 'postgres';
    this.inputs.pgdmschema.value = service.pgdmschema || service.schema || '';
    
    if( service.sslmode === 'require' ) this.inputs.ssl.setAttribute('checked', 'checked');
    else this.inputs.ssl.removeAttribute('checked');

    this.inputs.saveNew.removeAttribute('checked');

    this.error = null;
  }

  get value() {
    return {
      name : this.inputs.name.value,
      host : this.inputs.host.value,
      port : this.inputs.port.value,
      user : this.inputs.username.value,
      password : this.inputs.password.value,
      dbname : this.inputs.database.value,
      pgdmschema : this.inputs.pgdmschema.value,
      sslmode : this.inputs.ssl.checked ? 'require' : ''
    }
  }

  /**
   * @method _onCancelClicked
   * @description bound to cancel button click event
   */
  _onCancelClicked() {
    this.AppStateModel.setWindowLocation('connect');
  }

  async _onConnectNew() {
    let service = this.value;

    if( this.inputs.saveNew.checked && !service.name ) {
      this.error = new Error('To save connection you must provide a name.');
      return
    }

    let state = await this.PgModel.connect(service);

    if( state.state === 'error' ) {
      this.error = state.error;
      return;
    } else {
      this.error = null;
    }

    if( this.inputs.saveNew.checked ) {
      let name = service.name;
      delete service.name;
      this.PgModel.saveService(name, service, true);
    }
  }

  async _onSaveChangesClicked() {
    let service = this.value;

    if( !service.name ) {
      this.error = new Error('To save connection you must provide a name.');
      return
    }

    if( service.name !== this.originalService.name ) {
      this.PgModel.removeService(this.originalService.name);
    }

    let name = service.name;
    delete service.name;
    this.PgModel.saveService(name, service, true);

    this.AppStateModel.setWindowLocation('manage-connections');
  }

}

customElements.define('app-page-edit-connection', AppPageEditConnection);
