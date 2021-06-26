const fs = require('fs')
let input = "./index.js"
let output = "./dist/index.js"

const ejs = require('ejs')

const getEntry = fs.readFileSync(input, 'utf-8')

let contAry = []
const dealEntry = getEntry.replace(/(require)\(["'](.+?)["']\)/g,($1, $2, $3, $4) => {
    let cont = fs.readFileSync($3, "utf-8")
    contAry.push(cont)

    return $2 = `__wepack_require__(${contAry.length})`
})

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
        <%- dealEntry %>
    }),
    <% for(var i = 0; i < contAry.length; i++){%>
        (function(module, __webpack_exports__, __wepack_require__){
            <%- contAry[i] %>
        }),
    <%}%>
])`

let resutl = ejs.render(template,{
    dealEntry,
    contAry
})

fs.writeFileSync(output, resutl)