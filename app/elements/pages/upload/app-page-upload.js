import { LitElement, html } from 'lit-element';
import render from "./app-page-upload.tpl.js"
import formatError from "@ucd-lib/pgdm/cmd/run/format-error"
import path from "path";

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
      saving : {type: Boolean},
      uidColumn : {type : String},
      errorMessage : {type: String},
      runErrorMessage : {type: String},
      hasError : {type: Boolean},
      file : {type: String},
      tableView : {type: String},
      unknownColumns : {type: Array},
      hasUnknownCols : {type: Boolean},
      availableColumns : {type: Array},
      analyzeData : {type: Object},
      exportUpdatedFile : {type: String}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);

    this.reset();

    this._injectModel('PgdmModel', 'PgModel');
  }

  firstUpdated() {
    this.uploadPanel = this.byId('upload');
    this.tableDropDown = this.byId('tableDropDown');
  }

  reset() {
    this.isNewFile = false;
    this.isRevisionFile = false;
    this.isReplaceFile = false;
    this.fileSelected = false;
    this.uidColumn = 'unique id';
    this.hasError = false;
    this.errorMessage = '';
    this.runErrorMessage = '';
    this.file = '';
    this.exportUpdatedFile = '';
    this.currentSheetInfo = null;
    this.unknownColumns = [];
    this.hasUnknownCols = false;
    this.availableColumns = [];
    this.saving = false;
    this.analyzeData = {
      updates : [],
      inserts : [],
      deletes : []
    };
    this.tableView = '';
    this.currentFile = '';
    if( this.tableDropDown  ) {
      this.tableDropDown.reset();
    }
  }

  _onPgTablesUpdate(e) {
    if( e.state !== 'loaded' ) return;
    this.tables = e.payload.map(t => Object.assign({}, t));
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

    let attachedView = '';
    if( info.source && info.source.table_view ) attachedView = info.source.table_view;

    this.uploadPanel.setFile(info.sourceName+'.csv', attachedView);

    this.currentSheetInfo = info;
    if( info.data.length === 0 ) {
      return alert('Sheet has no rows');
    }
    info.columns = Object.keys(info.data[0]);

    this.fileSelected = true;
    if( info.type === 'new' ) {
      this.isNewFile = true;
    } else if( info.type === 'revision' ) {
      this.isRevisionFile = true;
    } else if( info.type === 'replacement' ) {
      this.isReplaceFile = true;
    }

    if( this.isRevisionFile || this.isReplaceFile ) {
      this._verifyColumns(info.source.table_view);
    }

    if( this.isRevisionFile ) {
      this.analyzeData = await this.PgdmModel.analyzeUpdate(info.source.name, info.data, info.source.revision);
      if( this.analyzeData.updates.length === 0 &&
        this.analyzeData.inserts.length === 0 && 
        this.analyzeData.deletes.length === 0 ) {
        this.hasError = true;
        this.errorMessage = 'No updates found';
      }

      if( this.analyzeData.errors &&  this.analyzeData.errors.length ) {
        this.hasError = true;
        this.errorMessage = html(['<div>'+ this.analyzeData.errors.join('</div><div>')+'</div>']);
      }
    }

    if( info.source ) {
      this.uidColumn = info.source.uid || 'unique id';
    }

    this.file = e.detail.file;
  }

  _verifyColumns(view) {
    if( !this.currentSheetInfo ) return;
    this.tableView = view;

    let availableColumns = {};
    this.tables.find(table => table.table_view === view)
      .tableViewInfo
      .forEach(item => availableColumns[item.column_name] = true);
    
    let unknownColumns = [];
    for( let col of this.currentSheetInfo.columns ) {
      if( !availableColumns[col] ) {
        unknownColumns.push(col);
      }
    }

    if( unknownColumns.length > 0 ) {
      this.hasError = true;
      this.hasUnknownCols = true;
      this.unknownColumns = unknownColumns;
      this.availableColumns = Object.keys(availableColumns);
    } else {
      this.hasUnknownCols = false;
      this.hasError = false;
    }
  }

  async _onSaveClicked() {
    if( this.hasError ) return;
    if( !this.currentSheetInfo.source ) return;
    if( !this.currentSheetInfo.source.table_view ) return;

    let filename = path.parse(this.file).name;

    this.saving = true;
    this.exportUpdatedFile = '';
    let exportUpdatedFile = '';

    let resp = {};
    if( this.isNewFile ) {
      resp = await this.PgdmModel.insert(filename, this.currentSheetInfo.source.table_view, this.currentSheetInfo.data);
      exportUpdatedFile = this.file;
    } else if( this.isReplaceFile ) {
      resp = await this.PgdmModel.replace(filename, this.currentSheetInfo.source.table_view, this.currentSheetInfo.data);
    } else if( this.isRevisionFile ) {
      resp = await this.PgdmModel.update(this.analyzeData);
      exportUpdatedFile = this.file;
    }
    this.saving = false;

    if( resp.state === 'error' ) {
      this.uploadPanel.reset();
      this.runErrorMessage = html([formatError(resp.error).replace(/ /g, '&nbsp;').replace(/\n/g, '<br />')]);
    } else {
      this.uploadPanel.setComplete();
      this.reset();
      this.exportUpdatedFile = exportUpdatedFile;

      setTimeout(() => {
        if( this.uploadPanel.state !== 'complete' ) return;
        this.uploadPanel.reset();
      }, 5000);
    }
  }

  _onPgdmInsertUpdate(e) {
    if( e.state === 'started' ) {
      this.uploadPanel.setProgress(0, 0);
    } else if( e.state === 'inserting' ) {
      this.uploadPanel.setProgress(e.payload.complete, e.payload.total);
    }
  }

  _onPgdmUpdateUpdate(e) {
    if( e.state === 'started' ) {
      this.uploadPanel.setProgress(0, 0);
    } else if( e.state === 'updating' ) {
      this.uploadPanel.setProgress(e.payload.complete, e.payload.total);
    }
  }

  // _onPgdmDeleteUpdate(e) {
  //   if( e.state === 'deleting' ) {
  //     this.uploadPanel.setProgress(0, 0);
  //   }
  // }

  _onTableDropDownChange(e) {
    if( e.detail.selectedIndex <= 0 ) {
      if( this.currentSheetInfo && this.currentSheetInfo.source ) { 
        this.currentSheetInfo.source.table_view = null;
      }
      return;
    }
    this._verifyColumns(e.detail.selectedItem.table_view);
    if( !this.currentSheetInfo.source ) {
      this.currentSheetInfo.source = {};
    }
    this.currentSheetInfo.source.table_view = e.detail.selectedItem.table_view;
  }

  async _onReplaceFileClicked() {
    let fileinfo = path.parse(this.exportUpdatedFile);

    let resp = await this.PgdmModel.exportCsv(
      fileinfo.name, 
      path.join(fileinfo.dir, fileinfo.name)  
    );

    if( resp.error ) {
      alert(resp.error.message);
    } else {
      alert(this.exportUpdatedFile+' Replaced.');
      this.exportUpdatedFile = '';
    }
  }

  _onCancelClicked() {
    this.reset();
    this.uploadPanel.reset();
  }

}

customElements.define('app-page-upload', AppPageUpload);
