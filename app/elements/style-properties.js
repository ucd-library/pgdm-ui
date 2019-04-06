let style = document.createElement('style');
document.head.appendChild(style);
style.innerHTML = `
html {
  --app-extra-dark-blue : #002655;
  --app-dark-blue       : #335379;
  --app-medium-blue     : #2286c3;
  --app-light-blue      : #9be7ff;

  --app-gold            : #daaa00;
  --app-red             : #ba0c2f;

  --app-extra-light-gray  : #f3f3f3;
  --app-light-gray        : #CCD4E0;
  --app-medium-gray       : #B2BDCF;
  

  --app-primary-color   : var(--app-extra-dark-blue);
  --app-secondary-color : var(--app-gold);
  
  --app-default-background-color : var(--app-extra-light-gray);


  --app-primary-text-color      : black;
  --app-secondary-text-color    : var(--default-secondary-color);
  --app-inverse-text-color      : white;
  --app-gray-text               : #8B8B8B;
  --app-disabled-text           : var(--gray-text);
  --app-max-width               : 1200px;
  --app-max-text-width          : 650px;
  --app-font-size               : 16px;
  --app-font-size-sm            : 14px;
  --app-font-weight             : 400;
  --app-font-weight-light       : 200;
  --app-font-weight-heavy       : 700;
  --app-layout-sm               : 768px;
  --app-grid-cell-width         : 250px;
  --app-default-outline         : 2px dotted var(--default-secondary-color);
  
  --paper-icon-button-ink-color : transparent !important;
}
body, html {
  /* @apply --paper-font-common-base; */
  font-family      : proxima-nova,"Lucida Grande","Lucida Sans","Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size        : var(--app-font-size);
  font-weight      : var(--app-font-weight);
  line-height      : calc(var(--app-font-size) * 1.625);
  margin           : 0;
  padding          : 0;
  background-color : var(--app-default-background-color);
  color            : var(--app-primary-text-color);
  max-width        : 100vw;
}
`