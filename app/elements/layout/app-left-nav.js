import { LitElement } from 'lit-element';
import render from "./app-left-nav.tpl.js"


export default class AppLeftNav extends LitElement {

  static get properties() {
    return {
      
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);
  }

}

customElements.define('app-left-nav', AppLeftNav);
