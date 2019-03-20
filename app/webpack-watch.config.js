const path = require('path');

let config = require('@ucd-lib/cork-app-build').watch({
  // root directory, all paths below will be relative to root
  root : path.resolve(__dirname, '..'),
  // path to your entry .js file
  entry : 'app/elements/pgdm-app.js',
  // folder where bundle.js will be written
  preview : '',
  // path your client (most likely installed via yarn) node_modules folder.
  // Due to the flat:true flag of yarn, it's normally best to separate 
  // client code/libraries from all other modules (ex: build tools such as this).
  clientModules : 'node_modules'
});

config.target = 'electron-renderer';

// config.module.rules.push({
//   test: /\.tpl\.html$/,
//   // test : /\.tpl\.js$/,
//   use: [
//     {
//       loader: path.resolve('../webpack/template-loader.js'),
//       options: {/* ... */}
//     }
//   ]
// })

module.exports = config;