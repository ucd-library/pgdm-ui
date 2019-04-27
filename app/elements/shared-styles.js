import { html } from 'lit-element';

export default html`
<style>
  button, a.btn {
    border-radius: 0;
    border: 1px solid var(--app-light-gray);
    background-color : var(--app-light-gray);
    color: var(--app-dark-blue);
    padding: 15px;
    font-weight: var(--app-font-weight-heavy);
    font-size: 14px;
  }

  button.inverse, a.btn.inverse {
    border-radius: 0;
    border: 0;
    border: 1px solid var(--app-light-gray);
    background-color : var(--app-extra-light-gray);
    color: var(--app-dark-blue);
    padding: 15px;
    font-weight: var(--app-font-weight-heavy);
    font-size: 14px;
  }

  .title {
    font-size: 26px;
    text-transform: uppercase;
    color: var(--app-primary-color);
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