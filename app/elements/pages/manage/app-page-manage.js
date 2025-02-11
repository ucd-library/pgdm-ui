import { LitElement } from 'lit-element';
import render from "./app-page-manage.tpl.js"
import path from "path"
import fs from "fs"

export default class AppPageManage extends Mixin(LitElement)
  .with(LitCorkUtils) {

  static get properties() {
    return {
      results : {type: Array},
      fileSelected : {type: Boolean},
      searched : {type: Boolean},
      running : {type: Boolean}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);
    
    this._injectModel('PgdmModel');

    this.results = [];
    this.inputTimer = -1;
    this.queryObj = {};
    this.searched = false;
  }

  firstUpdated() {
    this.directoryPicker = this.byId('directoryPicker');
  }

  _onTableDropDownChange(e) {
    this.queryObj.view = ((e.detail.selectedItem || {}).table_view || '').trim();
    this.query();
  }

  _onInputKeyUp(e) {
    let ele = e.currentTarget;
    if( this.inputTimer !== -1 ) clearTimeout(this.inputTimer);
    this.inputTimer = setTimeout(() => {
      this.inputTimer = -1;
      this.queryObj.source = ele.value;
      this.query();
    }, 200);
  }

  async query() {
    this.searched = true;
    let resp = await this.PgdmModel.list(this.queryObj);
    if( resp.error ) {
      return alert(resp.error.message);
    }
    
    this.results = resp.payload.map(item => {
      if( this.queryObj.view ) item.table_view = '';
      if( item.revision === 0) item.revision = '';
      else item.revision = 'v'+item.revision;
      return Object.assign({}, item);
    })
  }

  _onResultClicked(e) {
    let index = parseInt(e.currentTarget.getAttribute('index'));
    
    for( let i = 0; i < this.results.length; i++ ) {
      this.results[i].active = (index === i);
    }
    this.requestUpdate();
  }

  _getActiveFile() {
    for( let result of this.results ) {
      if( result.active ) return result;
    }
    return null;
  }

  async _onDeleteClicked(e) {
    let activeFile = this._getActiveFile();
    if( !activeFile ) return;

    if( !confirm(`Are you sure you want to delete ${activeFile.name}?`) ) return;

    this.running = true;
    let resp = await this.PgdmModel.delete(activeFile.name);
    this.running = false;

    console.log(resp);
    if( resp.error ) {
      console.error(resp.error);
      alert(resp.error.message);
    } else {
      this.query();
    }
  }

  _onDownloadClicked() {
    let activeFile = this._getActiveFile();
    if( !activeFile ) return;

    this.directoryPicker.value = '';
    this.waitingForPicker = true;
    this.directoryPicker.click();
  }

  async _onFileInputChange(e) {
    if( !this.waitingForPicker ) return;
    this.waitingForPicker = false;

    let files = e.currentTarget.files;
    if( !files.length ) return;

    let folder = e.currentTarget.files[0].path;
    let stats = fs.statSync(folder);
    if( !stats.isDirectory() ) {
      folder = path.dirname(folder);
    }

    let activeFile = this._getActiveFile().name;
    let file = path.join(folder, activeFile);

    if( fs.existsSync(file+'.csv') ) {
      if( !confirm(file+'.csv already exists.  Are you sure you want to overwrite?') ) return;
    }

    let resp = await this.PgdmModel.exportCsv(activeFile, file);
    if( resp.error ) alert(resp.error.message);
  }

}

customElements.define('app-page-manage', AppPageManage);
