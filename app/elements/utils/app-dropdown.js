import { LitElement } from 'lit-element';
import render from "./app-dropdown.tpl.js"

import "@polymer/iron-icons"

export default class AppDropdown extends LitElement {

  static get properties() {
    return {
      items : {type: Array},
      selectedItem : {type: Object},
      selectedIndex : {type: Number},
      helpText : {type: String},
      opened : {type: Boolean}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);

    this.items = [];
    this.selectedItem = null;
    this.selectedIndex = -1;
    this.helpText = 'foo';
    this.opened = false;
  
    this._onWindowClicked = this._onWindowClicked.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('click', this._onWindowClicked);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('click', this._onWindowClicked);
  }

  renderItem(item) {
    // implement me
    return item;
  }

  _onWindowClicked() {
    this.opened = false;
  }

  _onInputClicked(e) {
    e.preventDefault();
    e.stopPropagation();
    this.opened = !this.opened;
  }

  _onDropdownClicked(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  _onInputKeyup(e) {
    if( e.which !== 13 ) return;
    this.opened = !this.opened;
  }

  _onItemClicked(e) {
    this.selectedIndex = parseInt(e.currentTarget.getAttribute('index'));
    this.selectedItem = this.items[this.selectedIndex];
    let event = new CustomEvent('select', { 
      detail: {
        selectedIndex: this.selectedIndex,
        selectedItem: this.selectedItem
      } 
    });
    this.dispatchEvent(event);
    this.opened = false;
  }

}

customElements.define('app-dropdown', AppDropdown);
