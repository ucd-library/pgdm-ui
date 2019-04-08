import { html } from 'lit-element';

export default function render() { 
return html`

<style>
  :host {
    display: block;
  }

  #dragdrop {
    height: 100%;
    background-color: white;
    user-select: none;
    text-align: center;
    padding-top: 35px;
    border: 1px solid white;
  }

  #dragdrop[active], #dragdrop:hover {
    cursor: pointer;
    background-color: var(--app-extra-light-gray);
    border: 1px solid var(--app-light-gray);
    color: var(--app-primary-color);
  }

  iron-icon {
    height: 140px;
    width: 140px;
    color: var(--app-light-gray);
  }

  input[type="file"] {
    display: none;
  }
</style>  

<div id="dragdrop"
  ?active="${this.dragActive}"
  @drop="${this._onDrop}" 
  @dragover="${this._onDragOver}"
  @dragexit="${this._onDragLeave}"
  @dragleave="${this._onDragLeave}"
  @click="${this._onClick}">
  <div>
    <iron-icon icon="cloud-upload"></iron-icon>
    <div style="margin-bottom: 45px">
      <b>Drag and drop</b> file here<br />
      or click to browse
    </div>
  </div>
</div>

<input type="file" id="fileInput" @change="${this._onFileInputChange}" />

`;}