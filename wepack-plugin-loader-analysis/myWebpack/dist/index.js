(function(modules) { 
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
        const data = __wepack_require__(1)
console.log(data)

console.log('hello world')
    }),
    
        (function(module, __webpack_exports__, __wepack_require__){
            const data = "测试"

module.exports = data
        }),
    
])