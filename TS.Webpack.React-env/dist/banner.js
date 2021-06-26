(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["banner"],{

/***/ "./src/web/components/Ban/index.tsx":
/*!******************************************!*\
  !*** ./src/web/components/Ban/index.tsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nconst {\n  useCallback,\n  useSate,\n  useEffect\n} = react__WEBPACK_IMPORTED_MODULE_0__;\n\nconst Ban = () => {\n  let {\n    state,\n    setState\n  } = useSate(0);\n  const onclick = useCallback(() => {\n    // useCallback  进行封装， 对这个组件只执行一些，要不然句柄传递会重新渲染\n    setState(state++);\n  }, []); //副作用，不要写错了，不然会无限的循环\n  //三个生命周期合为一体\n\n  useEffect(() => {\n    //componentWillUpdate\n    //componentPropreciver\n    console.log('sssss');\n    return () => {//卸载时，执行\n    };\n  }, [state]); //依赖\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"h1\", {\n    onclick: onclick\n  }, \" banner \\u7EC4\\u4EF6\\uFF0Cclick me\", state);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Ban);\n\n//# sourceURL=webpack:///./src/web/components/Ban/index.tsx?");

/***/ })

}]);