import { LitElement } from 'lit-element';
import render from "./app-tables-dropdown.tpl.js"

import "./app-dropdown"
import "./app-table-definition"

export default class AppTablesDropdown extends Mixin(LitElement)
  .with(LitCorkUtils) {

  static get properties() {
    return {
      tables : {type: Array},
      selectedTable : {type: String},
      hasSelectedTable : {type: Boolean}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);

    this._injectModel('PgdmModel');

    this.tables = [];
    this.hasTable = false;

    this.addEventListener('select', e => {
      console.log(e.detail);
      this.selectedTable = e.detail.selectedItem.table_view.trim();
      this.hasTable = this.selectedTable ? true : false;
      console.log(this.selectedTable, this.hasTable);
    });
  }

  firstUpdated() {
    this.dropdown = this.byId('dropdown');
  }

  _showTableDef() {
    if( this.selectTable ) return;
    document.querySelector('app-table-definition').show(this.selectedTable);
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
