 (function(modules) { // webpackBootstrap
 	// The module cache
 	var installedModules = {};

 	// The require function
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


 	// Load entry module and return exports
 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
 })
/************************************************************************/
 ({
"./src/demo.js":

(function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    const data = "分析"
    /* harmony default export */
    __webpack_exports__["default"] = (data);
}),

"./src/index.js":

(function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ 
var _demo_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/demo.js").default;
// const css = require("./index.css")
console.log(_demo_js__WEBPACK_IMPORTED_MODULE_0__)

 })
})