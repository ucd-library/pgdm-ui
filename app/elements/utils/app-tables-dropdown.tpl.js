import { html } from 'lit-element';

export default function render() { 
return html`

<style>
  :host {
    display: block;
  }

  app-dropdown {
    display: block;
    width: 100%;
  }
</style>  


<app-dropdown
  id="dropdown"
  .helpText="Select a table"
  .items="${this.tables}"
  .renderItem="${this._renderDropdownItem}"
  .filter="${this._filterDropdown}">
</app-dropdown>
`;}