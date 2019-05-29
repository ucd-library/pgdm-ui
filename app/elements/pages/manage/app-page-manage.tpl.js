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
    overflow: auto;
    max-height: 350px;
    background-color: white;
  }

  .result {
    display: flex;
    padding: 8px;
    cursor: pointer;
  }

  .result:hover {
    background-color: var(--app-gold);
  }

  .result .view {
    font-size: 12px;
    font-style: italic;
    color: var(--app-light-gray);
  }
</style>  


<h2>Database Table View</h2>
<div>Filter by table</div>
<app-tables-dropdown id="tableDropDown" @select="${this._onTableDropDownChange}" ></app-tables-dropdown>

<h2>Source Files</h2>
<div>
  <input type="text" @keyup="${this._onInputKeyUp}">
</div>

<div class="results">
  ${this.results.map(result => html`
    <div class="result">
      <div style="flex:1">
        <div>${result.name}</div>
        <div class="view">${result.table_view}</div>
      </div>
      <div>${result.revision}</div>
    </div>
  `)}
</div>

<div ?hidden="${this.results.length > 0}">
  No results found.
</div>

<div style="text-align: right" ?hidden="${this.hasError}">
  <button>Delete File</button>  <button>Download File</button>
</div>

`;}