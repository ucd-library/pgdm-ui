import { html } from 'lit-element';

export default function render() { 
return html`

<style>
  :host {
    display: block;
  }
</style>  

<h2>Insert Sheet</h2>

<div>
  Select table view to insert into: 
  <select id="tables" @change="${this._onTableChange}">
    ${this.tables.map(table => html`<option value="${table.table_view}">${table.table_view}</option>`)}
  </select>
</div>


<vaadin-upload id="upload" max-files="1" accept=".csv" @upload-before="${this._onFilesChanged}">
  <span slot="drop-label">Drop your .csv spreadsheet here</span>
</vaadin-upload>

`;}