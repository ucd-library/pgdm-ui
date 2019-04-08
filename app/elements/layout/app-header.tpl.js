import { html } from 'lit-element';

export default function render() { 
return html`

<style>
  :host {
    display: block;
  }

  .title-bar {
    display: flex;
    align-items: center;
    background-image: url(./app/assets/topbar-bg.jpg);
    background-size: cover;
    background-position: center center;
    /* height: 50px; */
    color: var(--app-inverse-text-color);
  }

  .img-outer {
    padding: 10px 10px 5px 10px;
  }

  .title {
    padding: 0 10px;
    flex: 1;
    font-size: 20px;
  }

  .title-bar img {
    height: 35px;
  }
</style>  

<div class="title-bar">
  <div class="title">PostGres Data Management System</div>
  <div class="img-outer"><img src="./app/assets/ucd-lib-logo-white.png" /></div>
</div>

`;}