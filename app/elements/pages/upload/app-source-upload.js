import { LitElement } from 'lit-element';
import render from "./app-source-upload.tpl.js"


export default class AppSourceUpload extends LitElement {

  static get properties() {
    return {
      dragActive : {type: Boolean}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);

    this.dragActive = false;
  }

  _fireEvent(path) {
    let event = new CustomEvent('select', { 
      detail: {file: path} 
    });
    this.dispatchEvent(event);
  }

  _onDrop(e) {
    this.dragActive = false;
    if (e.dataTransfer.items) {
      for (var i = 0; i < e.dataTransfer.items.length; i++) {
        if (e.dataTransfer.items[i].kind === 'file') {
          var file = e.dataTransfer.items[i].getAsFile();
          this._fireEvent(file.path);
          return;
        }
      }
    }
  }

  _onDragOver(e) {
    this.dragActive = true;
    e.preventDefault();
  }

  _onDragLeave() {
    this.dragActive = false;
  }

  _onClick() {
    this.shadowRoot.querySelector('#fileInput').click();
  }

  _onFileInputChange(e) {
    let files = this.shadowRoot.querySelector('#fileInput').files;
    for( let file of files ) {
      this._fireEvent(file.path);
      this.shadowRoot.querySelector('#fileInput').value = '';
      return;
    }
  }

}

customElements.define('app-source-upload', AppSourceUpload);
