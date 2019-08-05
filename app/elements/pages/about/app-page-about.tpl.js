import { html } from 'lit-element';

export default function render() { 
return html`

<style>
  :host {
    display: block;
  }
  h1 {
    line-height: 36px;
    color: var(--app-extra-dark-blue);
  }
  h2 {
    color: var(--app-dark-blue);
  }
</style>  

<div style="max-width: 700px">
  <h1>PostGres Data Management System (PGDM) User Interface</h1>

  The PGDM UI is a data management tool allowing users to administer their database using
  CSV spreadsheets.  Each sheet should represent a database view for a table.  The user 
  preforms INSERT / UPDATE / DELETE modifications by editing a spreadsheet and then uploading
  the sheet via PGDM. After each update a new version of the sheet can be downloaded and stored
  in cloud storage.

  Sheets are versioned after each update preventing conflicting updates.  Sheets can be 
  completely removed from the system assuming no foreign key relations.

  <h2>Database Design & Code</h2>
  The PGDM UI is an <a href="https://electronjs.org/">Electron</a> application built on top of the
  <a href="https://github.com/ucd-library/pgdm">PGDM Library</a>.  Please see the 
  <a href="https://github.com/ucd-library/pgdm/tree/master/docs">PGDM Library</a> for documentation on database design and
  implemention details.  The PGDM Library includes a CLI.

  <h2>Report Bug</h2>
  If you are having an issue or have a feature request, please visit the 
  <a href="https://github.com/ucd-library/pgdm-ui/issues">PGDM UI Github Issue Tracker</a>.

</div>
`;}