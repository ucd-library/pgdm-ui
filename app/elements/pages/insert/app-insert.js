import { LitElement } from 'lit-element';
import render from "./app-insert.tpl.js"
import '@vaadin/vaadin-upload/vaadin-upload.js';

export default class AppInsert extends Mixin(LitElement)
  .with(LitCorkUtils) {

  static get properties() {
    return {
      tables : {type: Array}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this._injectModel('PgModel', 'PgdmModel');

    this.tables = [];
  }

  /**
   * @method _onPgTablesUpdate
   * @description bound to PgModel
   * 
   * @param {*} e 
   */
  _onPgTablesUpdate(e) {
    if( e.state !== 'loaded' ) return;
    this.tables = e.payload;
  }

  _onTableChange(e) {
    let val = this.byId('tables').value;
    console.log(val);
  }

  _onFilesChanged(e) {
    e.preventDefault();

    this.file = e.detail.file;
    this.PgdmModel.insert(this.file.path, this.byId('tables').value);
  }

  _onPgdmInsertUpdate(e) {
    if( e.state === 'inserting' ) {
      this._setFileStatus(e.payload);
    } else if( e.state === 'error' ) {
      console.log(e);
      alert(e.error.message);
      this.byId('upload').files = [];
    }
  }

  _setFileStatus(status) {
    this.file.progress = status.current;
    this.file.held = false;
    this.file.status = `Inserting row ${status.current}/${status.total}`;
    this.byId('upload')._notifyFileChanges(this.file);
  }

}

customElements.define('app-insert', AppInsert);
