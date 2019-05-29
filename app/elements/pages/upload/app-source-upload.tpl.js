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

  #dragdrop[active], #dragdrop[notuploading]:hover {
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

  .progress {
    margin: 25px;
    border-radius: 3px;
    height: 10px;
    border: 1px solid var(--app-light-gray);
  }

  .progress > div {
    height: 10px;
    background-color: var(--app-light-gray);
  }
</style>  

<div id="dragdrop"
  ?active="${this.dragActive}"
  ?notuploading="${this.state !== 'uploading'}"
  @drop="${this._onDrop}" 
  @dragover="${this._onDragOver}"
  @dragexit="${this._onDragLeave}"
  @dragleave="${this._onDragLeave}"
  @click="${this._onClick}">
  <div>
    <iron-icon icon="cloud-done" ?hidden="${this.state !== 'complete'}"></iron-icon>
    <iron-icon icon="cloud-upload" ?hidden="${this.state === 'complete'}"></iron-icon>
    <div style="margin-bottom: 45px">
      
      ${this._renderText(this.state)}
      <div ?hidden=${this.state !== 'uploading'} class="progress">
        <div style="width:${Math.floor(this.progress)}%"></div>
      </div>
      <div ?hidden=${this.state === 'init' || this.state === 'file-set'}>${this.completedRows} of ${this.totalRows} rows</div>
    </div>
  </div>
</div>

<input type="file" id="fileInput" @change="${this._onFileInputChange}" />

`;}