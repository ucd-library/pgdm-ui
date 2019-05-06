import { html } from 'lit-element';
import sharedcss from '../../shared-styles';

export default function render() { 
return html`
${sharedcss}
<style>
  :host {
    display: block;
  }

  h1 {
    font-size: 20px;
    color: var(--app-primary-color);
  }

  .break {
    height: 0;
    border-top: 1px dashed var(--app-light-gray);
    margin: 15px 0;
  }

  .input-layout {
    margin-bottom: 10px;
  }
  .input-layout > * {
    display: block;
    width: 100%;
    box-sizing: border-box;
  }
  .input-layout label {
    color: var(--app-dark-blue);
  }
  .input-layout input {
    border: 0;
    padding: 5px;
    font-size: 16px;
  }

  .layout {
    display: flex;
  }

  .checkbox-layout {
    display: flex;
    align-items: center;
  }
  .checkbox-layout label {
    margin-left: 10px;
  }

  button[class="inverse"] {
    padding-left: 30px;
    padding-right: 30px;
    margin-right: 10px;
  }

  .error {
    font-weight: bold;
    color: var(--app-red);
  }
</style>  

<h1>Database Connection</h1>

<div class="input-layout">
  <label for="name">Connection Name</label>
  <input type="text" id="name" />
</div>

<div class="input-layout">
  <label for="host">Host</label>
  <input type="text" id="host" />
</div>

<div class="input-layout">
  <label for="port">Port</label>
  <input type="number" id="port" />
</div>

<div class="break"></div>

<div class="layout">
  <div style="flex:1">
    <div class="input-layout" style="padding-right: 5px;">
      <label for="username">Username</label>
      <input type="text" id="username" />
    </div>
  </div>
  <div style="flex:1;">
    <div class="input-layout" style="flex:1; padding-left: 5px">
      <label for="password">Password</label>
      <input type="password" id="password" />
    </div>
  </div>
</div>

<div class="break"></div>

<div class="input-layout">
  <label>Database</label>
  <input type="text" id="database" />
</div>

<div class="checkbox-layout">
  <input type="checkbox" id="ssl" />
  <label for="ssl">Require SSL</label>
</div>

<div class="break"></div>

<div class="layout">
  <div style="flex:1">
    <div class="checkbox-layout" ?hidden="${!this.newConnection}">
      <input type="checkbox" id="save-new" />
      <label for="save-new">Add to Connection List</label>
    </div>
  </div>
  
  <div style="flex:1; text-align:right">
    <button class="inverse" @click="${this._onCancelClicked}">Cancel</button>
    <button id="connect" ?hidden="${!this.newConnection}" @click="${this._onConnectNew}">Connect</button>
    <button id="save-edit" ?hidden="${this.newConnection}" >Save Changes</button>
  </div>
</div>

<div ?hidden="${!this.error}" class="error">
  ${this.error ? this.error.message : ''}
</div>

`;}