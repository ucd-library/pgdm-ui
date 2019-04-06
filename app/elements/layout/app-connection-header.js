import { LitElement } from 'lit-element';
import render from "./app-connection-header.tpl.js"


export default class AppConnectionHeader extends Mixin(LitElement)
  .with(LitCorkUtils) {

  static get properties() {
    return {
      connected : {type: Boolean},
      host : {type: String}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);

    this._injectModel('PgModel');
  }

  _onDisconnectClicked() {
    this.PgModel.disconnect();
  }

  _onPgConnectionUpdate(e) {
    if( e.state === 'connected' ) {
      this.connected = true;
      this.host = e.payload.host;
    } else {
      this.connected = false;
      this.host = '';
    }
  }

}

customElements.define('app-connection-header', AppConnectionHeader);
