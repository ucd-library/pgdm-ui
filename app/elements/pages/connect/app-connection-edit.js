import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-connection-edit.html"

export default class AppConnectionEdit extends Mixin(PolymerElement)
  .with(EventInterface) {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      editing : {
        type : Boolean,
        value : false
      }
    }
  }

  constructor() {
    super();
    this._injectModel('PgModel');
  }

  set editConnection(value) {
    this.$.name.value = value || '';
    this._originalConnectionName = value;
    this.editing = true;
  }

  set service(value) {
    this.$.database.value = value.dbname || '';
    this.$.host.value = value.host || '';
    this.$.port.value = value.port || 5432;
    this.$.username.value = value.user || '';
    this.$.password.value = value.password || '';
    this.$.ssl.checked = value.sslmode === 'require' ? true : false;
  }

  reset() {
    this.editing = false;
    this._originalConnectionName = '';
    this.$.name.value = '';
    this.$.database.value = '';
    this.$.host.value = '';
    this.$.port.value = 5432;
    this.$.username.value = '';
    this.$.password.value = '';
    this.$.ssl.checked = false;
  }

  /**
   * @method _onCancelClicked
   * @description bound to cancel button click event
   */
  _onCancelClicked() {
    let event = new CustomEvent('cancel', {});
    this.dispatchEvent(event);
  }

  /**
   * @method _onTestClicked
   * @description bound to test button click event
   */
  async _onTestClicked() {
    let valid = this._testConnection();
    if( valid ) alert('Valid Connection');
    else alert('Connection Error');
  }

  /**
   * @method _onSaveClicked
   * @description bound to save button click event
   */
  _onSaveClicked() {
    let service = this._getService();
    if( !service.name ) {
      return alert('Service name not set');
    }

    this.PgModel.saveService(
      service.name,
      service.config,
      this._originalConnectionName !== service.name ? this._originalConnectionName : null
    );

    let event = new CustomEvent('save', {});
    this.dispatchEvent(event);
  }

  /**
   * @method _onDeleteClicked
   * @description bound to delete button click event
   */
  _onDeleteClicked() {
    this.PgModel.removeService(this._originalConnectionName);
    let event = new CustomEvent('delete', {});
    this.dispatchEvent(event);
  }

  _getService() {
    return {
      name : this.$.name.value || '',
      config : {
        dbname : this.$.database.value || '',
        host : this.$.host.value || '',
        port : parseInt(this.$.port.value || 5432),
        user : this.$.username.value || '',
        password : this.$.password.value || '',
        sslmode : this.$.ssl.checked ? true : false
      }
    }
  }

  _testConnection() {
    return this.PgModel.testConnection(this._getService().config);
  }

}

customElements.define('app-connection-edit', AppConnectionEdit);