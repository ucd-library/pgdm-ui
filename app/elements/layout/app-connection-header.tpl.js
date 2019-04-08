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
</style>  

<div class="layout">
  <div class="triangle-topright"></div>
  <div class="label">
    Connected to ${this.host} <iron-icon icon="icons:language"></iron-icon>
  </div>
</div>


`;}