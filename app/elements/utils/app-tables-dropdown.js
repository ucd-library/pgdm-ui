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

  firstUpdated() {
    this.dropdown = this.byId('dropdown');
  }

  _onPgdmTablesUpdate(e) {
    if( e.state !== 'loaded' ) return;
    this.tables = [{table_view:' '}].concat(e.payload.map(t => Object.assign({}, t)));
  }

  _renderDropdownItem(item) {
    return item.table_view;
  }

  _filterDropdown(item, filter) {
    if( !filter ) return true;
    return item.table_view.match(new RegExp(filter, 'i')) ? true : false;
  }

  reset() {
    this.dropdown.setSelectedIndex(0);
  }


}

customElements.define('app-tables-dropdown', AppTablesDropdown);
