import { LitElement } from 'lit-element';
import render from "./app-page-edit-connection.tpl.js"


export default class AppPageEditConnection extends LitElement {

  static get properties() {
    return {
      
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);
  }

}

customElements.define('app-page-edit-connection', AppPageEditConnection);
