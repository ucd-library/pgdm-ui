import { html } from 'lit-element';

export default function render() { 
return html`

<style>
  :host {
    display: block;
  }
</style>  


<div>
  Sources
  <input type="text" id="sourceInput" @keyup="${this._onSourceKeyUp}" />
</div>

<table ?hidden="${!this.searchList.length}">
  <thead>
    <td>Source</td>
    <td>View</td>
  </thead>
  ${this.searchList.map((item, i) => html`<tr @click="${this._onSheetClicked}" index="${i}">
    <td>${item.name}</td>
    <td>${item.table_view}</td>
  </tr>`)}
</table>

${!this.searchList.length && this.searched ? html`<div>no matches</div>`:''}

`;}