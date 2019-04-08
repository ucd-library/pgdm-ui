import { html } from 'lit-element';
const VERSION = require('../../../package').version;

export default function render() { 
return html`

<style>
  :host {
    display: block;
    background-color: var(--app-light-gray);
    width: 100px;
    font-size: 12px;
  }

  .layout {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  button {
    width: 75px;
    border: 1px solid white;
    border-radius: 0;
    background-color: transparent;
    color: var(--app-primary-color);
    font-size: 16px;
    padding: 10px 0;
    margin-top: 15px;
    cursor: pointer;
  }

  button[active] {
    color: white;
    background-color: var(--app-primary-color);
    border: var(--app-primary-color);
  }

  button iron-icon {
    width: 35px;
    height: 35px;
    margin-bottom: 5px;
  }

  a {
    cursor: pointer;
    color: var(--app-primary-color);
    text-decoration: none;
  }

  .link-line {
    border-bottom: 1px solid white;
  }

  .version {
    font-style: italic;
  }
</style>  

<div class="layout">
  <div style="text-align: center">
    <button active>
      <div><iron-icon icon="note-add"></iron-icon></div>
      <div>Upload</div>
    </button>
  </div>
  <div style="text-align: center">
    <button>
      <div><iron-icon icon="settings"></iron-icon></div>
      <div>Manage</div>
    </button>
  </div>
  <div style="flex:1"></div>
  <div style="padding: 5px">
    <div class="link-line">
      <a>About PGDM</a>
    </div>
    <div class="link-line">
      <a>Contact</a>
    </div>
    <div class="version">Version ${VERSION}</div>
  </div>
</div>

`;}