import { LitElement } from 'lit-element';
import render from "./app-page-upload.tpl.js"

import "../../utils/app-tables-dropdown"
import "./app-source-upload"

export default class AppPageUpload extends LitElement {

  static get properties() {
    return {
      
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);
  }

  _onFileSelect(e) {
    console.log(e.detail);
  }

}

customElements.define('app-page-upload', AppPageUpload);
