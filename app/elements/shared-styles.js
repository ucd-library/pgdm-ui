import { html } from 'lit-element';

export default html`
<style>
  button, a.btn {
    border-radius: 0;
    border: 0;
    background-color : var(--app-light-gray);
    color: var(--app-dark-blue);
    padding: 15px;
    font-weight: var(--app-font-weight-heavy);
    font-size: 14px;
  }
  [hidden] {
    display: none !important;
  }
</style>
`;