import { LitElement } from 'lit-element';
import render from "./app-dropdown.tpl.js"

import "@polymer/iron-icons"
import { isRegExp } from 'util';

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
    this.helpText = '';
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

  updated(changedProperties) {
    if( changedProperties.has('opened') ) {
      this._onOpenedChanged();
    }
    // } else if( changedProperties.has('selectedIndex') ) {
    //   this._setActiveIndex();
    // }
  }

  _onInputKeyup(e) {
    switch (e.which) {
      case 13: // enter
        this._onEnter();
        break;
      case 38: // up arrow
        this._onUpArrow();
        break;
      case 40: // down arrow
        this._onDownArrow();
        break;
    }
  }

  _onEnter() {
    this.opened = !this.opened;
    if( !this.opened && this.activeIndex > -1 ) {
      this.setSelectedIndex(this.activeIndex);
    }
  }

  _onUpArrow() {
    if( !this.opened ) return;
    this.activeIndex--;
    if( this.activeIndex < 0 ) {
      this.activeIndex = this.items.length-1;
    }
    this._setActiveIndex();
  }

  _onDownArrow() {
    if( !this.opened ) return;
    this.activeIndex++;
    if( this.activeIndex >= this.items.length ) {
      this.activeIndex = 0;
    }
    this._setActiveIndex();
  }

  _onOpenedChanged() {
    if( !this.opened ) return;
    this.activeIndex = -1;
    this._setActiveIndex();
  }

  _setActiveIndex() {
    for( let i = 0; i < this.items.length; i++ ) {
      this.items[i]._active = (i === this.activeIndex);
    }
  
    return this.requestUpdate();
  }

  _onItemClicked(e) {
    let index = parseInt(e.currentTarget.getAttribute('index'));
    this.setSelectedIndex(index);
    this.opened = false;
  }

  setSelectedIndex(index) {
    this.selectedIndex = index;
    this.selectedItem = this.items[this.selectedIndex];
    let event = new CustomEvent('select', {
      bubbles: true,
      composed: true,
      detail: {
        selectedIndex: this.selectedIndex,
        selectedItem: this.selectedItem
      } 
    });
    this.dispatchEvent(event);
  }

}

customElements.define('app-dropdown', AppDropdown);
