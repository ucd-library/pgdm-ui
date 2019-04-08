import { LitElement } from 'lit-element';
import render from "./app-tables-dropdown.tpl.js"

import "./app-dropdown"

export default class AppTablesDropdown extends Mixin(LitElement)
  .with(LitCorkUtils) {

  static get properties() {
    return {
      tables : {type: Array}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);

    this._injectModel('PgdmModel');

    this.tables = [];
  }

  _onPgdmTablesUpdate(e) {
    if( e.state !== 'loaded' ) return;
    this.tables = [{table_view:' '}].concat(e.payload.map(t => Object.assign({}, t)));
  }

  _renderDropdownItem(item) {
    return item.table_view;
  }

}

customElements.define('app-tables-dropdown', AppTablesDropdown);
