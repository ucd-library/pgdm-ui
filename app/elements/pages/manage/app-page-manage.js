import { LitElement } from 'lit-element';
import render from "./app-page-manage.tpl.js"


export default class AppPageManage extends Mixin(LitElement)
  .with(LitCorkUtils) {

  static get properties() {
    return {
      results : {type: Array}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);
    
    this._injectModel('PgdmModel');

    this.results = [];
    this.inputTimer = -1;
    this.queryObj = {};
  }

  _onTableDropDownChange(e) {
    this.queryObj.view = ((e.detail.selectedItem || {}).table_view || '').trim();
    this.query();
  }

  _onInputKeyUp(e) {
    let ele = e.currentTarget;
    if( this.inputTimer !== -1 ) clearTimeout(this.inputTimer);
    this.inputTimer = setTimeout(() => {
      this.inputTimer = -1;
      this.queryObj.source = ele.value;
      this.query();
    }, 200);
  }

  async query() {
    let resp = await this.PgdmModel.list(this.queryObj);
    if( resp.error ) {
      return alert(resp.error.message);
    }
    
    this.results = resp.payload.map(item => {
      if( this.queryObj.view ) item.table_view = '';
      if( item.revision === 0) item.revision = '';
      else item.revision = 'v'+item.revision;
      return Object.assign({}, item);
    })

    console.log(this.results);
  }

  _onPgdmListUpdate(e) {
    console.log(e);
  }

}

customElements.define('app-page-manage', AppPageManage);
