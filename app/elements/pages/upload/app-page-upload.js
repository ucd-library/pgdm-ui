import { LitElement } from 'lit-element';
import render from "./app-page-upload.tpl.js"

import "../../utils/app-tables-dropdown"
import "./app-source-upload"

export default class AppPageUpload extends Mixin(LitElement)
  .with(LitCorkUtils) {

  static get properties() {
    return {
      fileSelected : {type: Boolean},
      isNewFile : {type: Boolean},
      isRevisionFile : {type: Boolean},
      isReplaceFile : {type: Boolean},
      uidColumn : {type : String},
      errorMessage : {type: String},
      hasError : {type: Boolean},
      file : {type: String}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);

    this.reset();

    this._injectModel('PgdmModel', 'PgModel');
  }

  reset() {
    this.isNewFile = false;
    this.isRevisionFile = false;
    this.isReplaceFile = false;
    this.fileSelected = false;
    this.uidColumn = 'unique id';
    this.hasError = false;
    this.errorMessage = '';
    this.file = '';
  }

  _onPgTablesUpdate(e) {
    if( e.state !== 'loaded' ) return;
    debugger;
    this.tables = e.payload.map(t => Object.assign({}, t));
    console.log(this.tables);
  }

  async _onFileSelect(e) {
    this.reset();
    
    let info;
    try {
      info = await this.PgdmModel.analyzeFile(e.detail.file);
    } catch(e) {
      this.hasError = true;
      this.errorMessage = e.message;
      return;
    }

    this.fileSelected = true;
    if( info.type === 'new' ) {
      this.isNewFile = true;
    } else if( info.type === 'revision' ) {
      this.isRevisionFile = true;
    } else if( info.type === 'replacement' ) {
      this.isReplaceFile = true
    }

    if( this.isRevisionFile || this.isReplaceFile ) {
      let table = this.tables.find(table => table.name === info.source.table_view);
    }
    console.log('TODO: check column names');

    if( info.source ) {
      this.uidColumn = info.source.uid || 'unique id';
    }

    this.file = e.detail.file;
  }

  _onSaveClicked() {
    // if( this.newfile )
  }

}

customElements.define('app-page-upload', AppPageUpload);
