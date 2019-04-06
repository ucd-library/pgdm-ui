import { LitElement } from 'lit-element';
import render from "./app-page-upload.tpl.js"


export default class AppPageUpload extends LitElement {

  static get properties() {
    return {
      
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);
  }

}

customElements.define('app-page-upload', AppPageUpload);
