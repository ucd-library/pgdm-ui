import { html } from 'lit-element';

export default function render() { 
return html`

<style>
  :host {
    display: block;
  }

  app-dropdown {
    display: block;
    flex: 1;

  }

  a {
    cursor: pointer;
  }
</style>  


<div style="display:flex;     align-items: center;">
  <app-dropdown
    id="dropdown"
    .helpText="Select a table"
    .items="${this.tables}"
    .renderItem="${this._renderDropdownItem}"
    .filter="${this._filterDropdown}">
  </app-dropdown>
  <div ?hidden="${!this.hasTable}" style="padding: 5px;">
    <a @click="${this._showTableDef}"><iron-icon icon="info-outline"></iron-icon></a>
  </div>
</div>


<app-table-definition></app-table-definition>
`;}