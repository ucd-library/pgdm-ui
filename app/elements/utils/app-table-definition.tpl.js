import { html } from 'lit-element';

export default function render() { 
return html`

<style>
  :host {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 10000;
  }

  .background {
    background-color: rgba(0,0,0,.7);
    overflow: auto;
    height: 100vh;
    width: 100vw;
    align-items: flex-start;
    justify-content: center;
    display: flex;
  }

  .popup {
    margin: 50px 15px;
    background: white;
    padding: 15px;
    min-width: 350px;
  }

  .title {
    display: flex;
    margin-bottom: 45px;
  }

  .title > div:first-child {
    font-size: 22px;
    padding-right: 50px;
    flex: 1;
  }

  th {
    text-align: left;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  tr {
    border-bottom: 1px solid #ccc;
  }

  td {
    padding: 5px;
  }

  a {
    cursor: pointer;
  }

  [required] {
    color: var(--app-medium-blue);
  }

  [pk] {
    font-weight: bold;
  }

</style>

<div class="background">
  <div class="popup">
    
    <div class="title">
      <div>${this.table}</div>
      <div><a @click="${this.hide}"><iron-icon icon="clear"></iron-icon></a></div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Column</th>
          <th>Type</th>
          <th>Required</th>
        </tr>
      </thead>
      <tbody>
      ${this.definitions.map(col => html`
        <tr ?pk="${col.pk}" ?required="${col.required}">
          <td>${col.name}</td>
          <td>${col.type}</td>
          <td>${col.required ? 'True' : 'False'}</td>
        </tr>
      `)}
      </tbody>

    </table>

    <div required style="font-size: 10px; margin-top: 25px;">*Column required in sheet for INSERT/UPDATE</div>
  </div>
</div>


`;}