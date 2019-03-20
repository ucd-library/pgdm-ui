module.exports = async function(source) {
  
  let t = `module.exports = function renderTemplate(tag) {

    return tag\`${source}\`;
  };`;

  console.log(t);
  return t;
}


// var loaderUtils = require("loader-utils");

// module.exports = function(source) {
//   if (this.cachable) {
//     this.cachable(true);
//   }

//   const query = loaderUtils.getOptions(this);
//   let content = source;
//   if (query && query.transpile) {
//     content = compile(`\`${source}\``).code;
//   } else {
//     content = `\`${content}\``;
//   }

//   const funcName = '__html_es6_template_loader__';
//   const result = `
//     function ${funcName}() {
//       return ${content};
//     }
//     module.exports = function(context) {
//       return ${funcName}.call(context, context);
//     }
//   `;

//   console.log(result);
//   if (!this.callback) {
//     return result;
//   }
//   this.callback(null, result);
//   return null;
// }