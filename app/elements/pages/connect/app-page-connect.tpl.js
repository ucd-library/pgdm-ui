import { html } from 'lit-element';

export default function render() { 
return html`

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

  .title {
    font-size: 26px;
    text-transform: uppercase;
    color: var(--app-primary-color);
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
        helpText="Select a connection">
      </app-dropdown>
    </div>
    <div class="connect-layout">
      <div style="flex: 1">
        <a @click="${this._onCreateConnectionClicked}">
          <iron-icon icon="add-circle-outline"></iron-icon> New Connection
        </a>
      </div>
      <div><button>Connect</button></div>
    </div>
    <div class="manage-connections">
      <a>Manage Connections</a>
    </div>
  </div>
</div>



<!-- <iron-pages attr-for-selected="view" selected="${this.view}">
  <app-connection-list view="list"
    @connect="_onConnect"
    @edit-connection="_onEditConnection">
  </app-connection-list>
  
  <div view="edit">
    <h3>Edit PostgreSQL Connection</h3>
    <app-connection-edit 
      id="editConnection" 
      on-save="_onSaveEditConnection"
      on-delete="_onDeleteEditConnection"
      on-cancel="_onCancelEditConnection">
    </app-connection-edit>
  </div>

  <div view="create">
    <h3>Create PostgreSQL Connection</h3>
    <app-connection-edit 
      id="createConnection" 
      on-save="_onSaveEditConnection"
      on-cancel="_onCancelEditConnection">
    </app-connection-edit>
  </div>
</iron-pages> -->

`;}