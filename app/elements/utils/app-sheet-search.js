import { LitElement } from 'lit-element';
import render from "./app-sheet-search.tpl.js"

export default class AppSheetSearch extends LitElement {

  static get properties() {
    return {
      searchError : {type: String},
      searchList : {type: Array},
      table : {type:String}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);

    this.reset();
  }

  reset() {
    this.searchError = '';
    this.searchList = [];
    this.searched = false;
  }

  _onSourceKeyUp(e) {
    this.search({source: e.currentTarget.value});
  }

  async search(query) {
    if( this.table ) query.table = table;

    let e = await this.PgdmModel.list(query);

    if( e.state === 'error' ) {
      this.searchList = [];
      this.searchError = e.error.message;
    } else if( e.state === 'loaded' ) {
      this.searchList = e.payload;
      this.searchError = '';
    }

    this.searched = true;
  }

  async _onSheetClicked(e) {
    let index = parseInt(e.currentTarget.getAttribute('index'));
    let source = this.searchList[index];
    var event = new CustomEvent('sheet-select', { detail: source });
    this.dispatchEvent(event);
  }

}

customElements.define('app-sheet-search', AppSheetSearch);
