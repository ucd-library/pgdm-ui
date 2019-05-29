import { html } from 'lit-element';
import sharedStyles from "../../shared-styles"

export default function render() { 
return html`

${sharedStyles}
<style>
  :host {
    display: block;
  }

  .results {
    margin-top: 5px;
    overflow: auto;
    max-height: 350px;
    background-color: white;
  }

  .result {
    display: flex;
    padding: 8px;
    cursor: pointer;
    line-height: 16px;
    align-items: center;
    min-height: 24px;
  }

  .result:hover {
    background-color: var(--app-light-gold);
  }

  .result[active] {
    background-color: var(--app-gold);
  }

  .result .view {
    font-size: 12px;
    font-style: italic;
    color: var(--app-dark-blue);
  }

  .input {
    display: flex;
    align-items: center;
    background-color: white;
  }

  .input input {
    flex: 1;
    border: none;
    background: transparent;
    font-size: 18px;
    height: 42px;
    margin: 0;
    padding-left: 10px;
  }

  .break {
    height: 0px;
    border-bottom: 1px dashed var(--app-light-gray);
    margin: 15px 0;
  }
</style>  


<h2>Database Table View</h2>
<app-tables-dropdown id="tableDropDown" @select="${this._onTableDropDownChange}" ></app-tables-dropdown>

<h2 style="margin-top: 15px;">Source Files</h2>
<div class="input">
  <input type="text" @keyup="${this._onInputKeyUp}">
  <div style="padding: 10px">
    <iron-icon icon="search"></iron-icon>
  </div>
</div>

<div class="results">
  ${this.results.map((result,index) => html`
    <div class="result" @click="${this._onResultClicked}" index="${index}" ?active="${result.active}">
      <div style="flex:1">
        <div>${result.name}</div>
        <div class="view">${result.table_view}</div>
      </div>
      <div style="width: 25px;">${result.revision}</div>
      <div style="width: 25px;">
        <iron-icon icon="done" ?hidden="${!result.active}"></iron-icon>
      </div>
    </div>
  `)}
</div>

<div ?hidden="${this.results.length > 0 || !this.searched}">
  No results found.
</div>

<div class="break"></div>

<input @change="${this._onFileInputChange}" id="directoryPicker" type="file" directory webkitdirectory style="display:none" />

<div style="text-align: right" ?hidden="${this.hasError}">
  <button @click="${this._onDeleteClicked}">Delete File</button>  
  <button @click="${this._onDownloadClicked}">Download File</button>
</div>
`;}