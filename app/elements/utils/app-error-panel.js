import { LitElement, html } from 'lit-element';
import render from "./app-error-panel.tpl.js"


export default class AppErrorPanel extends LitElement {

  static get properties() {
    return {
      message : {type: String},
      hidden : {type: Boolean, reflect: true}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);

    this.message = '';
    this.hidden = true;
  }

  renderMessage(msg) {
    return html`${msg}`;
  }

  updated() {
    this.hidden = this.message ? false : true;
  }

}

customElements.define('app-error-panel', AppErrorPanel);