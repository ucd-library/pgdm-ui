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

    let tables = e.payload.map(t => Object.assign({}, t));
    tables.sort((a, b) => {
      if( a.table_view > b.table_view ) return 1;
      if( a.table_view < b.table_view ) return -1;
      return 0;
    });

    this.tables = [{table_view:' '}].concat(tables);
  }

  _renderDropdownItem(item) {
    if( !item ) return '';
    return item.table_view;
  }

  _filterDropdown(item, filter) {
    if( !filter ) return true;
    return item.table_view.match(new RegExp(filter, 'i')) ? true : false;
  }

  reset() {
    if( this.tables.length === 0 ) return;
    this.dropdown.setSelectedIndex(0);
  }


}

customElements.define('app-tables-dropdown', AppTablesDropdown);
