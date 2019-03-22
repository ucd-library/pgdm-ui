import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-pg-status.html"

export default class AppPgStatus extends Mixin(PolymerElement)
  .with(EventInterface) {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      connected : {
        type : Boolean,
        value : false
      }
    }
  }

  constructor() {
    super();
    this._injectModel('PgModel');
  }

  _onDisconnectClicked() {
    this.PgModel.disconnect();
  }

  _onPgConnectionUpdate(e) {
    this.connected = (e.state === 'connected') ? true : false;
    console.log(e);
  }

}

customElements.define('app-pg-status', AppPgStatus);