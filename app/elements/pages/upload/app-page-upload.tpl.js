import { html } from 'lit-element';
import sharedStyles from "../../shared-styles"

export default function render() { 
return html`

${sharedStyles}
<style>
  :host {
    display: block;
  }

  .layout {
    display: flex;
    align-items: center;
  }

  .right-panel {
    flex: 1;
    margin-left: 35px;
  }

  .break {
    height: 0px;
    border-bottom: 1px dashed var(--app-light-gray);
    margin: 15px 0;
  }

  h2 {
    margin-bottom: 10px
  }

  .help {
    margin-left: 30px;
    line-height: 18px;
  }

  .help.select {
    color: var(--app-primary-color);
  }

  .help.unselect {
    color: #888888;
    font-style: italic;
    font-size: 12px;
  }

  .checkbox-panel {
    margin-bottom: 15px;
  }

  .error {
    text-align: center;
    color: var(--app-red);
  }

  .error.run {
    text-align: left;
    overflow: auto;
    box-sizing: border-box;
    display: flex;
    max-height: 300px;
    margin-bottom: 40px;
  }

  [active-checkbox] {
    font-weight: bold;
  }
</style>  

<div class="layout">
  <div style="flex:1">
    <h2>Upload Data Source File</h2>
    <app-source-upload id="upload" @select="${this._onFileSelect}"></app-source-upload>
  </div>
  <div class="right-panel">
    <div>This is a...</div>
    <div class="checkbox-panel">
      <div ?active-checkbox="${this.isNewFile}">
        <iron-icon icon="radio-button-unchecked" ?hidden="${this.isNewFile}"></iron-icon>
        <iron-icon icon="check-circle" ?hidden="${!this.isNewFile}"></iron-icon> New File
      </div>
      <div ?hidden="${!this.fileSelected}">
        <div ?hidden="${this.isNewFile}" class="unselect help">The provided source file already exists in database.</div>
        <div ?hidden="${!this.isNewFile}" class="select help">The provided source file does not exist in database.  Select table 
          to INSERT into below.
        </div>
      </div>
    </div>

    <div class="checkbox-panel">
      <div ?active-checkbox="${this.isRevisionFile}">
        <iron-icon icon="radio-button-unchecked" ?hidden="${this.isRevisionFile}"></iron-icon>
        <iron-icon icon="check-circle" ?hidden="${!this.isRevisionFile}"></iron-icon> Revision (updates to exported source file)
      </div>
      <div ?hidden="${!this.fileSelected}">
        <div ?hidden="${this.isRevisionFile}" class="unselect help">
          <div ?hidden="${!this.isNewFile}">The provided source file does not exist in database</div>
          <div ?hidden="${this.isNewFile}">The provided source file does not contain the 
            ${this.uidColumn} column. If you meant to preform a revision, export the table from the 
            <a href="#manage">management</a> screen.
          </div>
        </div>
        <div ?hidden="${!this.isRevisionFile}" class="select help">The provided source file contains the ${this.uidColumn} column with the correct 
        revision tag.
        </div>
      </div>
    </div>

    <div class="checkbox-panel">
      <div ?active-checkbox="${this.isReplaceFile}">
        <iron-icon icon="radio-button-unchecked" ?hidden="${this.isReplaceFile}"></iron-icon>
        <iron-icon icon="check-circle" ?hidden="${!this.isReplaceFile}"></iron-icon> Replacement (full replacement of source file)
      </div>
      <div ?hidden="${!this.fileSelected}">
        <div ?hidden="${this.isReplaceFile}" class="unselect help">
          <div ?hidden="${!this.isNewFile}">The provided source file does not exist in database</div>
          <div ?hidden="${this.isNewFile}">The provided source file is a exported file (contains
          ${this.uidColumn} column with revision tag).</div>
        </div>
        <div ?hidden="${!this.isReplaceFile}" class="select help">The provided source file exists in the database and was not 
        exported via PGDM (The file does not contain the ${this.uidColumn} column with the correct revision tag).
        </div>
      </div>
    </div>
  </div>
</div>

<div ?hidden="${!this.hasError}" class="error">
  ${this.errorMessage}
</div>

<div class="break"></div>

<div ?hidden="${!this.isNewFile}">
  <h2>Database Table View</h2>
  <div>Select which table view to INSERT spreadsheet into.</div>
  <app-tables-dropdown id="tableDropDown" @select="${this._onTableDropDownChange}"></app-tables-dropdown>

  <div class="break"></div>
</div>

<div ?hidden="${!this.hasUnknownCols}" class="error">
  The table view '${this.tableView}' does not have to following columns: 
  <b>${this.unknownColumns.join(', ')}</b>.  Available columns are: <b>${this.availableColumns.join(', ')}</b>.
</div>

<div ?hidden="${!this.runErrorMessage}" class="error run">
  <div>${this.runErrorMessage}</div>
</div>

<div style="text-align: right" ?hidden="${this.hasError}">
  <button @click="${this._onSaveClicked}">Save Changes</button>
</div>

`;}