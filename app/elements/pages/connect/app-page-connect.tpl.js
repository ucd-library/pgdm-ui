import { html } from 'lit-element';
import sharedcss from '../../shared-styles';
const VERSION = require('../../../../package').version;

export default function render() { 
return html`
${sharedcss}
<style>
  :host {
    display: block;
  }

  #dropdown {
    width: 400px;
  }

  .layout {
    margin-top: 100px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  iron-icon[icon="language"] {
    width: 80px;
    height: 80px;
    color: var(--app-medium-gray);
  }

  .sub-title {
    font-style: italic;
    color: var(--app-primary-color);
  }

  .dropdown-layout {
    margin-top: 25px;
    text-align: left;
  }

  .connect-layout {
    display: flex;
    text-align: left;
    margin: 20px;
    align-items: center;
  }

  a {
    color: var(--app-gray-text);
    cursor: pointer;
    text-decoration: none;
  }

  .manage-connections {
    text-align: center;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid var(--app-gray-text);
    color: var(--app-gray-text);
  }

  app-error-panel {
    display: inline-block;
  }

  paper-spinner-lite {
    --paper-spinner-color: var(--app-primary-color);
  }
</style>


<div class="layout">
  <div>
    <div><iron-icon icon="language"></iron-icon></div>
    <div class="title">Connect</div>
    <div class="sub-title">to a database</div>
    <div class="dropdown-layout">
      <app-dropdown 
        id="dropdown" 
        .items="${this.services}" 
        .renderItem="${this._renderDropdownItem}"
        .filter="${this._filterDropdown}"
        helpText="Select a connection">
      </app-dropdown>
    </div>
    <div class="connect-layout">
      <div style="flex: 1">
        <a @click="${this._onCreateConnectionClicked}" style="vertical-align:bottom">
          <iron-icon icon="add-circle-outline"></iron-icon> New Connection
        </a>
      </div>
      <div><button @click="${this._onConnectClicked}">Connect</button></div>
    </div>
    <div style="text-align:center">
      <app-error-panel .message="${this.connectErrorMessage}"></app-error-panel>
      <paper-spinner-lite ?hidden="${!this.loading}" active></paper-spinner-lite>
      <span ?hidden="${!this.loading}">${this.tablesLoadingMessage}</span>
    </div>
    <div class="manage-connections">
      <div><a @click="${this._onManageClicked}">Manage Connections</a></div>
      <div style="font-size: 11px">v${VERSION}</div>
    </div>
  </div>
</div>


`;}