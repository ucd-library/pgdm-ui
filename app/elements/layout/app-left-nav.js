import { LitElement } from 'lit-element';
import render from "./app-left-nav.tpl.js"


export default class AppLeftNav extends Mixin(LitElement)
  .with(LitCorkUtils) {

  static get properties() {
    return {
      isUpload : {type: Boolean},
      isManage : {type: Boolean}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this._injectModel('AppStateModel');
    this.reset();
  }

  reset() {
    this.isUpload = false;
    this.isManage = false;
  }

  _onAppStateUpdate(e) {
    this.reset();
    if( e.location.page === 'upload' ) this.isUpload = true;
    else if( e.location.page === 'manage' ) this.isManage = true;
  }

  _onUploadClicked() {
    this.AppStateModel.setWindowLocation('upload');
  }

  _onManageClicked() {
    this.AppStateModel.setWindowLocation('manage');
  }

}

customElements.define('app-left-nav', AppLeftNav);
