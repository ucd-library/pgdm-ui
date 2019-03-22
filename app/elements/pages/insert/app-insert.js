import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-insert.html"

export default class AppInsert extends Mixin(PolymerElement)
  .with(EventInterface) {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      tables : {
        type : Array,
        value : () => []
      }  
    }
  }

  constructor() {
    super();
    this._injectModel('PgModel');
  }

  /**
   * @method _onPgTablesUpdate
   * @description bound to PgModel
   * 
   * @param {*} e 
   */
  _onPgTablesUpdate(e) {
    if( e.state !== 'loaded' ) return;
    this.tables = e.payload;
    this.$.tables.innerHTML = this.tables
      .map(table => `<option value="${table.table_view}">${table.table_view}</option>`)
      .join('');
  }

}

customElements.define('app-insert', AppInsert);