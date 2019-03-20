import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-pg-status.html"

export default class AppPgStatus extends PolymerElement {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      
    }
  }

}

customElements.define('app-pg-status', AppPgStatus);