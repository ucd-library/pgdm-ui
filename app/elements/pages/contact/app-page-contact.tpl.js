import { html } from 'lit-element';

export default function render() { 
return html`

<style>
  :host {
    display: block;
  }

  h2 {
    color: var(--app-extra-dark-blue);
  }
  h3 {
    color: var(--app-dark-blue);
  }
</style>  

<div style="max-width: 700px">
  <h2>Contact</h2>

  <div>PGDM was developed by the <a href="https://www.library.ucdavis.edu">University of California Davis, Library</a>
  <a href="https://www.library.ucdavis.edu/people/#online-strategy-6">Online Strategy</a> department.</div>

  <h3>Developer / Designer</h3>
  <div>Justin Merz - Research Support Engineer - <a href="mailto:jrmerz@ucdavis.edu">jrmerz@ucdavis.edu</a></div>
  <div>Kimmy Hescock - User Experience Designer - <a href="mailto:kahescock@ucdavis.edu">kahescock@ucdavis.edu</a></div>
  
  <h3>Other Relevant Members</h3>
  <div>Peter Brantley - Director of Online Strategy - <a href="mailto:pbrantley@ucdavis.edu">pbrantley@ucdavis.edu</a></div>
  <div>Quinn Hart - Digital Applications Manager - <a href="mailto:qjhart@ucdavis.edu">qjhart@ucdavis.edu</a></div>
  <div>Vessela Ensberg - Associate Director Data Architecture - <a href="mailto:vensberg@ucdavis.edu">vensberg@ucdavis.edu</a></div>

  <h3>GitHub</h3>
  <div><a href="https://github.com/ucd-library/pgdm-ui">https://github.com/ucd-library/pgdm-ui</a></div>
  <div><a href="https://github.com/ucd-library/pgdm">https://github.com/ucd-library/pgdm</a></div>
</div>


`;}