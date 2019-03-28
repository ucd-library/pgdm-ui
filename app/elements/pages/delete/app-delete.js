import { LitElement } from 'lit-element';
import render from "./app-delete.tpl.js"

import "../../utils/app-sheet-search"

export default class AppDelete extends Mixin(LitElement)
  .with(LitCorkUtils) {

  static get properties() {
    return {
      searchError : {type: String},
      searchList : {type: Array}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);

    this.searchError = '';
    this.searchList = [];

    this._injectModel('PgdmModel');
  }

  _onSourceKeyUp(e) {
    this.search({source: e.currentTarget.value});
  }

  async search(query) {
    let e = await this.PgdmModel.list(query);

    if( e.state === 'error' ) {
      this.searchList = [];
      this.searchError = e.error.message;
    } else if( e.state === 'loaded' ) {
      this.searchList = e.payload;
      this.searchError = '';
    }
  }

  async _onViewClicked(e) {
    let index = parseInt(e.currentTarget.getAttribute('index'));
    let source = this.searchList[index];
    if( !confirm(`Are you sure you want to delete source: ${source.name}?`) ) return;
    
    e = await this.PgdmModel.delete(source.name);
    if( e.error ) console.error(e.error);
    else this.search({source: this.byId('sourceInput').value});
  }

  /**
   * @method _pgdmDeleteUpdate
   * @description bound to PGDM Model
   */
  _pgdmDeleteUpdate(e) {
    if( e.state === 'error' ) console.error(e);
  }




}

customElements.define('app-delete', AppDelete);
