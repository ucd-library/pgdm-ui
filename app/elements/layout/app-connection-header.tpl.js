import { html } from 'lit-element';

export default function render() { 
return html`

<style>
  :host {
    display: block;
    color: var(--app-primary-color);
  }

  .layout {
    display: flex;
    justify-content: flex-end;
  }

  .label {
    background-color: white;
  }

  .triangle-topright {
    width: 0;
    height: 0;
    border-top: 30px solid white;
    border-left: 30px solid transparent;
  }

  .popup {
    position: absolute;
    width: 100%;
    z-index: 100;
    top: 3px;
  }

  .popup > div {
    display: flex;
    align-items: center;
    background-color: var(--app-light-gray);
    color: var(--app-primary-color);
    padding: 8px;
    border-bottom: 1px dashed white;
  }

  .popup > div:last-child {
    border-bottom: none;
  }
</style>  

<div class="layout">
  <div class="triangle-topright"></div>
  <div class="label">
    <div tabindex="0" style="cursor:pointer" @click="${this._onTogglePopupClick}">
      Connected to ${this.host} <iron-icon icon="icons:language"></iron-icon>
    </div>
    <div style="position:relative">
      <div class="popup" ?hidden="${!this.showPopup}">
        <div>
          <iron-icon icon="social:person"></iron-icon>
          <div>${this.user}</div>
        </div>
        <div>
          <iron-icon icon="device:storage"></iron-icon>
          <div>${this.dbname}</div>
        </div>
        <div tabindex="0" style="cursor:pointer" @click="${this._onCloseConnectionClicked}">
          <iron-icon icon="highlight-off"></iron-icon>
          <div>Close Connection</div>
        </div>
      </div>
    </div>
  </div>
  
</div>


`;}