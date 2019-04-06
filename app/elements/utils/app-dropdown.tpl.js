import { html } from 'lit-element';

export default function render() { 
return html`

<style>
  :host {
    display: inline-block;
    width: 300px;
    background-color: white;
  }

  .input {
    min-height: 40px;
    display: flex;
    align-items: center;
  }

  .dropdown  {
    position: relative;
  }

  .dropdown > div {
    background-color: var(--app-light-gray);
    position: absolute;
    width: 100%;
    z-index: 1000;
  }

  iron-icon[icon="arrow-drop-down"] {
    margin: 10px;
    color: var(--app-primary-color);
  }

  .selected {
    padding: 10px;
    flex: 1;
    user-select: none;
  }

  .help {
    font-size : var(--app-font-size-sm);
    color : var(--app-gray-text);
    font-weight: var(--app-font-weight-light);
  }

  .item {
    border-bottom: 1px dashed white;
    padding: 10px;
    cursor: pointer;
  }
  .item:last-child {
    border-bottom: none;
  }

  .item:hover, .item[active] {
    background-color: var(--app-medium-gray);
  }

  /* .item:hover {
    background: var(--app-light-gray);
  } */
</style>  

<div class="input" tabindex="1" @click="${this._onInputClicked}" @keyup="${this._onInputKeyup}">
  <div class="selected">
    ${(this.selectedIndex !== -1) ? 
      this.renderItem(this.selectedItem) : 
      html`<span class="help">${this.helpText}</span>`
    }  
  </div>
  <div><iron-icon icon="arrow-drop-down"></iron-icon></div>
</div>
<div class="dropdown" ?hidden="${!this.opened}" @click="${this._onDropdownClicked}" >
  <div>
    ${this.items.map((item, index) => 
      html`<div class="item" index="${index}" ?active="${item._active}" @click="${this._onItemClicked}">
        ${this.renderItem(item)}
      </div>`
    )}
  </div>
</div>

`;}