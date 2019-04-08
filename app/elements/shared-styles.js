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

  h2 {
    margin: 0;
    padding: 0;
    font-size: 18px;
    color: var(--app-primary-color);
  }

  [hidden] {
    display: none !important;
  }
</style>
`;