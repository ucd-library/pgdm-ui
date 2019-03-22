import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-nav.html"

import "./app-pg-status"

export default class AppNav extends PolymerElement {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      
    }
  }

}

customElements.define('app-nav', AppNav);