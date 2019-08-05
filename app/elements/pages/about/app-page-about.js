import { LitElement } from 'lit-element';
import render from "./app-page-about.tpl.js"
import { shell } from 'electron';

export default class AppPageAbout extends LitElement {

  static get properties() {
    return {
      
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);
  }

  firstUpdated() {
    let anchors = [... this.shadowRoot.querySelectorAll('a')];
    anchors.forEach(a => a.addEventListener('click', e => this._onAnchorClicked(e)));
  }

  _onAnchorClicked(e) {
    e.preventDefault();
    e.stopPropagation();
    shell.openExternal(e.currentTarget.getAttribute('href'));
  }


}

customElements.define('app-page-about', AppPageAbout);
