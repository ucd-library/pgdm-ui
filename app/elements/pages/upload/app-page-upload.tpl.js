import { html } from 'lit-element';
import sharedStyles from "../../shared-styles"

export default function render() { 
return html`

${sharedStyles}
<style>
  :host {
    display: block;
  }

  .layout {
    display: flex;
    align-items: center;
  }

  .right-panel {
    flex: 1;
    margin-left: 35px;
  }

  .break {
    height: 0px;
    border-bottom: 1px dashed var(--app-light-gray);
    margin: 15px 0;
  }

  h2 {
    margin-bottom: 10px
  }
</style>  

<h2>Database Table</h2>
<app-tables-dropdown></app-tables-dropdown>

<div class="break"></div>

<div class="layout">
  <div style="flex:1">
    <h2>Upload Data Source File</h2>
    <app-source-upload @select="${this._onFileSelect}"></app-source-upload>
  </div>
  <div class="right-panel">
    <div>This is a...</div>
    <div><input type="radio" /> New File</div>
    <div><input type="radio" /> Revision (updates to exported source file)</div>
    <div><input type="radio" /> Replacement (full replacement of source file)</div>
  </div>
</div>

<div class="break"></div>

<div style="text-align: right">
  <button>Save Changes</button>
</div>

`;}