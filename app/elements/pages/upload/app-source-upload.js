import { LitElement, html } from 'lit-element';
import render from "./app-source-upload.tpl.js"
import {webUtils} from 'electron';


export default class AppSourceUpload extends LitElement {

  static get properties() {
    return {
      dragActive : {type: Boolean},
      file : {type: String},
      attachedView : {type: String},
      progress : {type: Number},
      state : {type: String},
      totalRows : {type: Number},
      completedRows : {type: Number}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);

    this.dragActive = false;
    
    this.reset();

    // this.test();
  }

  test() {
    let total = 1330;
    let completed = 0;

    setTimeout(() => {
      this.reset();
      setTimeout(() => {
        this.setFile('my-testing-file.csv');
        let it = setInterval(() => {
          completed += 100;
          if( total < completed ) {
            clearInterval(it);
            this.setComplete();
            this.test();
          } else {
            this.setProgress(completed, total);
          }
        }, 500);
      }, 2000);
    }, 2000);
  }


  reset() {
    this.file = '';
    this.progress = 0;
    this.totalRows = 0;
    this.completedRows = 0;
    this.attachedView = '';
    this.state = 'init';
  }

  setFile(file, attachedView) {
    this.state = 'file-set';
    this.file = file;
    this.attachedView = attachedView;
  }

  setProgress(completed, total) {
    this.dragActive = false;
    this.completedRows = completed;
    this.totalRows = total;
    this.progress = Math.round((completed/total) * 100) ;
    this.state = 'uploading';
  }

  setComplete() {
    this.completedRows = this.totalRows;
    this.progress = 100;
    this.showText = false;
    this.state = 'complete';
  }

  _renderText(state) {
    if( state === 'init' ) {
      return html`<b>Drag and drop</b> file here<br />
      or click to browse`;
    }
    return html`<b>${this.file}</b> ${this.attachedView ? html`<br /> attached to ${this.attachedView}` : ''}`;
  }

  _fireEvent(path) {
    let event = new CustomEvent('select', { 
      detail: {file: path} 
    });
    this.dispatchEvent(event);
  }

  _onDrop(e) {
    // Stop the browser from redirecting (opening a new window) when dropping the file
    e.preventDefault();

    this.dragActive = false;
    if (e.dataTransfer.files) {
      for (var i = 0; i < e.dataTransfer.files.length; i++) {
          var filepath = webUtils.getPathForFile(e.dataTransfer.files[i]);
          this._fireEvent(filepath);
          return;
      }
    }
  }

  _onDragOver(e) {
    if( this.state === 'uploading' ) return;
    this.dragActive = true;
    e.preventDefault();
  }

  _onDragLeave() {
    this.dragActive = false;
  }

  _onClick() {
    if( this.state === 'uploading' ) return;
    this.shadowRoot.querySelector('#fileInput').click();
  }

  _onFileInputChange(e) {
    debugger;
    let files = this.shadowRoot.querySelector('#fileInput').files;
    for( let file of files ) {
      this._fireEvent(file.path);
      this.shadowRoot.querySelector('#fileInput').value = '';
      return;
    }
  }

}

customElements.define('app-source-upload', AppSourceUpload);
