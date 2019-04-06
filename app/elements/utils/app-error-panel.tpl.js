import { html } from 'lit-element';

export default function render() { 
return html`

<style>
  :host {
    display: block;
    color: var(--app-red);
  }
  .error-panel {
    display: flex;
  }
</style>  

<div class="error-panel">
  <div>${this.renderMessage(this.message)}</div>
  <div></div>
</div>
`;}