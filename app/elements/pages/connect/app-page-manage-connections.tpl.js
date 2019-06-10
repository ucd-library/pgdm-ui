import { html } from 'lit-element';

export default function render() { 
return html`

<style>
  :host {
    display: block;
  }

  h1 {
    font-size: 22px;
    color: var(--app-primary-color);
    margin: 20px 0 0 0;
    padding-bottom: 10px;
    border-bottom: 1px dashed var(--app-light-gray);
  }

  h3 {
    color: var(--app-dark-blue);
    margin: 0;
    padding: 0;
  }

  .info {
    font-style: italic;
  }

  a {
    cursor: pointer;
    color: var(--app-primary-color);
  }

  .layout {
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px dashed var(--app-light-gray);
  }

  .buttons a {
    margin: 0 10px;
  }

  .new-connection {
    display: flex;
    margin-top: 10px;
  }

  .new-connection a {
    color: var(--app-dark-blue);
  }
</style>  

<h1>Manage Database Connections</h1>

${this.services.map((service, index) => 
  html`<div class="layout">
    <div style="flex:1">
      <h3>${service.name}</h3>
      <div class="info">${service.user}@${service.host}:${service.port}/${service.dbname}</div>
    </div>
    <div class="buttons">
      <a @click="${this._onDeleteClicked}" index="${index}">
        <iron-icon icon="delete-forever"></iron-icon>
      </a>
      <a @click="${this._onEditClicked}" index="${index}">
        <iron-icon icon="create"></iron-icon>
      </a>
    </div>
  </div>`
)}

<div class="new-connection">
  <!-- <div style=""></div> -->
  <div style="flex:1">
    <a @click="${this._onCancelClicked}"><iron-icon icon="arrow-back"></iron-icon> Back</a>
  </div>
  <div>
    <a @click="${this._onNewClicked}">New Connection <iron-icon icon="add-circle-outline"></iron-icon></a>
  </div>
</div>

`;}