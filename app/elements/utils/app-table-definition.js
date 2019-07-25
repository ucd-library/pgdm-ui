import { LitElement } from 'lit-element';
import render from "./app-table-definition.tpl.js"


export default class AppTableDefinition extends Mixin(LitElement)
  .with(LitCorkUtils) {

  static get properties() {
    return {
      table : {type: String},
      definitions : {type: Array}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this._injectModel('PgModel');
    this.definitions = [];
  }

  firstUpdated() {
    this.parentNode.removeChild(this);
    document.body.appendChild(this);
  }

  updated(props) {

    if( props.has('table') && this.table ) {
      this.definitions = 
        this.PgModel.getTableColumnDefinitions(this.table);
    }
  }

  show(table) {
    if( table ) this.table = table;
    this.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  hide() {
    this.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

}

customElements.define('app-table-definition', AppTableDefinition);
