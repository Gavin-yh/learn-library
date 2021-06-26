const fs = require('fs')
let input = "./index.js"
let output = "./dist/index.js"

const ejs = require('ejs')

const getEntry = fs.readFileSync(input, 'utf-8')

let template = `(function(modules) { 
    var installedModules = {}; //模块的缓存

  	function __webpack_require__(moduleId) {
 
  		// Check if module is in cache
  		if(installedModules[moduleId]) {
  			return installedModules[moduleId].exports;
  		}
  		// Create a new module (and put it into the cache)
  		var module = installedModules[moduleId] = {
  			i: moduleId,
  			l: false,
  			exports: {}
  		};
 
  		// Execute the module function
  		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
 
  		// Flag the module as loaded
  		module.l = true;
 
  		// Return the exports of the module
  		return module.exports;
  	}

    return __webpack_require__(0);
})([
    (function(module, __webpack_exports__, __wepack_require__){
        <%- getEntry %>
    })
])`

let resutl = ejs.render(template,{
    getEntry
})

fs.writeFileSync(output, resutl)