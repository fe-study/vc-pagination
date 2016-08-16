(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueComponentsName"] = factory();
	else
		root["VueComponentsName"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(3)
module.exports = __webpack_require__(7)

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(6)
if (false) {
(function () {
var hotAPI = require("vue-hot-reload-api")
hotAPI.install(require("vue"))
if (!hotAPI.compatible) return
var id = "-!babel!./../../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=script&index=0!./Pagination.vue"
hotAPI.createRecord(id, module.exports)
module.hot.accept(["-!babel!./../../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=script&index=0!./Pagination.vue","-!vue-html-loader!./../../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=template&index=0!./Pagination.vue"], function () {
var newOptions = require("-!babel!./../../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=script&index=0!./Pagination.vue")
if (newOptions && newOptions.__esModule) newOptions = newOptions.default
var newTemplate = require("-!vue-html-loader!./../../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=template&index=0!./Pagination.vue")
hotAPI.update(id, newOptions, newTemplate)
})
})()
}

/***/ },
/* 2 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../node_modules/.0.21.0@css-loader/index.js!./../../../node_modules/.7.1.7@vue-loader/lib/style-rewriter.js?id=_v-3f554902&file=Pagination.vue!./../../../node_modules/.2.2.3@less-loader/index.js!./../../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=style&index=0!./Pagination.vue", function() {
			var newContent = require("!!./../../../node_modules/.0.21.0@css-loader/index.js!./../../../node_modules/.7.1.7@vue-loader/lib/style-rewriter.js?id=_v-3f554902&file=Pagination.vue!./../../../node_modules/.2.2.3@less-loader/index.js!./../../../node_modules/.7.1.7@vue-loader/lib/selector.js?type=style&index=0!./Pagination.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)();
// imports


// module
exports.push([module.i, ".vc-pagination-component.center {\n  text-align: center;\n}\n.vc-pagination-component.left {\n  text-align: left;\n}\n.vc-pagination-component.right {\n  text-align: right;\n}\n.vc-pagination-component .pagination {\n  vertical-align: middle;\n}\n.vc-pagination-component .pagination > li > a,\n.vc-pagination-component .pagination > li > span {\n  padding: 0;\n  padding-top: 4px;\n  padding-bottom: 4px;\n  min-width: 35px;\n  text-align: center;\n}\n.vc-pagination-component .form-inline {\n  display: inline-block;\n  vertical-align: middle;\n}\n.vc-pagination-component .form-inline .form-control {\n  width: 44px;\n}\n.vc-pagination-component .err-pageto {\n  border: 1px solid #F97D7D;\n}\n.vc-pagination-component .dropdown-menu {\n  width: 100%;\n  min-width: 100%;\n  text-align: center;\n}\n.vc-pagination-component .dropdown-menu a {\n  padding: 3px;\n}\n.vc-pagination-component .v-page-dropdown-transition {\n  display: inline-block;\n}\n.vc-pagination-component .v-page-dropdown-enter {\n  -webkit-animation: fadeinT .3s;\n          animation: fadeinT .3s;\n}\n.vc-pagination-component .v-page-dropdown-leave {\n  -webkit-animation: fadeoutT .3s;\n          animation: fadeoutT .3s;\n}\n/* 淡入-从上 */\n@-webkit-keyframes fadeinT {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(-20px);\n  }\n  100% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n  }\n}\n@keyframes fadeinT {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(-20px);\n            transform: translateY(-20px);\n  }\n  100% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n            transform: translateY(0);\n  }\n}\n/* 淡出-向上 */\n@-webkit-keyframes fadeoutT {\n  0% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n  }\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(-20px);\n  }\n}\n@keyframes fadeoutT {\n  0% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n            transform: translateY(0);\n  }\n  100% {\n    opacity: 0;\n    -webkit-transform: translateY(-20px);\n            transform: translateY(-20px);\n  }\n}\n", ""]);

// exports


/***/ },
/* 5 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ },
/* 6 */
/***/ function(module, exports) {

module.exports = "<div class=\"vc-pagination-component\" :class=\"align\">\n        <ul class=\"pagination\">\n            <li v-if=\"!noPrevious\">\n                <a style=\"cursor:pointer;\" @click=\"selectPage(current - 1)\" aria-label=\"Previous\">\n                    <span aria-hidden=\"true\">‹</span>\n                </a>\n            </li>\n            <li v-for=\"page in pages\" :class=\"{ 'active': page.number == current, 'disabled': page.disabled }\">\n                <a style=\"cursor:pointer;\" @click=\"selectPage(page.number)\" v-text=\"page.text\"></a>\n            </li>\n            <li v-if=\"!noNext\">\n                <a style=\"cursor:pointer;\" @click=\"selectPage(current + 1)\" aria-label=\"Next\">\n                    <span aria-hidden=\"true\">›</span>\n                </a>\n            </li>\n        </ul>\n        <form class=\"form-inline\" v-if=\"jumpable\" @submit.prevent=\"go\">\n            {{ goLabel }}到&nbsp;<input type=\"text\" class=\"form-control\" :class=\"{ 'err-pageto': errPageTo }\" v-model=\"pageTo\" />&nbsp;页\n            <button class=\"btn btn-sm btn-info\">{{ goLabel }}</button>\n        </form>\n        <form class=\"form-inline\" v-if=\"pageSizeEditable\">\n            <div class=\"btn-group\">\n                <button type=\"button\" class=\"btn btn-default dropdown-toggle\" @click.stop=\"togglePageSizeDropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n                    {{ pageSize }}项/页<span class=\"caret\"></span>\n                </button>\n                <ul class=\"dropdown-menu\" v-show=\"showPageSizeDropdown\" transition=\"v-page-dropdown\">\n                    <li v-for=\"pz in pageSizeArr\" @click=\"handlePageSizeChange(pz)\"><a href=\"javascript:\">{{ pz }}项/页</a></li>\n                </ul>\n            </div>\n        </form>\n    </div>";

/***/ },
/* 7 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
// <template>
//     <div class="vc-pagination-component" :class="align">
//         <ul class="pagination">
//             <li v-if="!noPrevious">
//                 <a style="cursor:pointer;" @click="selectPage(current - 1)" aria-label="Previous">
//                     <span aria-hidden="true">‹</span>
//                 </a>
//             </li>
//             <li v-for="page in pages" :class="{ 'active': page.number == current, 'disabled': page.disabled }">
//                 <a style="cursor:pointer;" @click="selectPage(page.number)" v-text="page.text"></a>
//             </li>
//             <li v-if="!noNext">
//                 <a style="cursor:pointer;" @click="selectPage(current + 1)" aria-label="Next">
//                     <span aria-hidden="true">›</span>
//                 </a>
//             </li>
//         </ul>
//         <form class="form-inline" v-if="jumpable" @submit.prevent="go">
//             {{ goLabel }}到&nbsp;<input type="text" class="form-control" :class="{ 'err-pageto': errPageTo }" v-model="pageTo" />&nbsp;页
//             <button class="btn btn-sm btn-info">{{ goLabel }}</button>
//         </form>
//         <form class="form-inline" v-if="pageSizeEditable">
//             <div class="btn-group">
//                 <button type="button" class="btn btn-default dropdown-toggle" @click.stop="togglePageSizeDropdown" aria-haspopup="true" aria-expanded="false">
//                     {{ pageSize }}项/页<span class="caret"></span>
//                 </button>
//                 <ul class="dropdown-menu" v-show="showPageSizeDropdown" transition="v-page-dropdown">
//                     <li v-for="pz in pageSizeArr" @click="handlePageSizeChange(pz)"><a href="javascript:">{{ pz }}项/页</a></li>
//                 </ul>
//             </div>
//         </form>
//     </div>
// </template>

// <style lang="less">
// .vc-pagination-component {
//     &.center {
//         text-align: center;
//     }
//     &.left {
//         text-align: left;
//     }
//     &.right {
//         text-align: right;
//     }
//     .pagination  {
//         vertical-align: middle;

//         & > li > a,  & > li > span {
//             padding: 0;
//             padding-top: 4px;
//             padding-bottom: 4px;
//             min-width: 35px;
//             text-align: center;
//         }
//     }
//     .form-inline {
//         display: inline-block;
//         vertical-align: middle;

//         .form-control {
//             width: 44px;
//         }
//     }
//     .err-pageto {
//         border: 1px solid #F97D7D;
//     }
//     .dropdown-menu {
//         width: 100%;
//         min-width: 100%;
//         text-align: center;

//         a {
//             padding: 3px;
//         }
//     }
//     .v-page-dropdown-transition {
//         display: inline-block;
//     }
//     .v-page-dropdown-enter {
//         animation: fadeinT .3s;
//     }
//     .v-page-dropdown-leave {
//         animation: fadeoutT .3s;
//     }
// }

// @maxRange: 20px;

// /* 淡入-从上 */
// @-webkit-keyframes fadeinT {
//     0%{opacity:0;-webkit-transform:translateY(-@maxRange);}
//     100%{opacity:1;-webkit-transform:translateY(0);}
// }
// @-moz-keyframes fadeinT {
//     0%{opacity:0;-moz-transform:translateY(-@maxRange);}
//     100%{opacity:1;-moz-transform:translateY(0);}
// }
// @-ms-keyframes fadeinT {
//     0%{opacity:0;-ms-transform:translateY(-@maxRange);}
//     100%{opacity:1;-ms-transform:translateY(0);}
// }
// @keyframes fadeinT {
//     0%{opacity:0;transform:translateY(-@maxRange);}
//     100%{opacity:1;transform:translateY(0);}
// }

// /* 淡出-向上 */
// @-webkit-keyframes fadeoutT{
//     0%{opacity:1;-webkit-transform:translateY(0);}
//     100%{opacity:0;-webkit-transform:translateY(-@maxRange);}
// }
// @-moz-keyframes fadeoutT{
//     0%{opacity:1;-moz-transform:translateY(0);}
//     100%{opacity:0;-moz-transform:translateY(-@maxRange);}
// }
// @-ms-keyframes fadeoutT{
//     0%{opacity:1;-ms-transform:translateY(0);}
//     100%{opacity:0;-ms-transform:translateY(-@maxRange);}
// }
// @keyframes fadeoutT{
//     0%{opacity:1;transform:translateY(0);}
//     100%{opacity:0;transform:translateY(-@maxRange);}
// }
// </style>

// <script>
var COMPONENT_NS = 'PAGINATION';

exports.default = {
    props: {
        simple: { // 普通版本
            type: Boolean,
            default: false
        },
        align: {
            type: String,
            default: 'center'
        },
        displayNum: { // 可看见的页码数目
            type: Number,
            coerce: function coerce(val) {
                return Number(val);
            },
            default: 6
        },
        edgeNum: { // 当页码较多时，前后空余的可选页码数量
            type: Number,
            coerce: function coerce(val) {
                return Number(val);
            },
            default: 2
        },
        current: { // 当前页码数
            twoWay: true,
            type: Number,
            coerce: function coerce(val) {
                return Number(val);
            },
            validator: function validator(value) {
                return value > 0;
            },
            default: 1
        },
        pageSize: { // 页面数据量
            twoWay: true,
            type: Number,
            coerce: function coerce(val) {
                return Number(val);
            },
            validator: function validator(value) {
                return value > 0;
            },
            default: 10
        },
        total: { // 全部结果集数目
            type: Number,
            coerce: function coerce(val) {
                return Number(val);
            },
            default: 0
        },
        onPageChange: {
            type: Function,
            default: function _default() {}
        },
        jumpable: { // 是否显示跳转控件（页码输入框和跳转按钮）
            type: Boolean,
            default: true
        },
        goLabel: { // 跳转按钮的文案
            type: String,
            default: '跳转'
        },
        invalidCallback: {
            type: Function,
            default: function _default() {}
        },
        pageSizeEditable: {
            type: Boolean,
            default: true
        },
        pageSizeArr: {
            type: Array,
            default: function _default() {
                return [10, 20, 40, 100];
            }
        },
        onPageSizeChange: {
            type: Function,
            default: function _default() {}
        }
    },
    data: function data() {
        return {
            pageTo: void 666,
            errPageTo: false,
            showPageSizeDropdown: false
        };
    },
    computed: {
        noPrevious: function noPrevious() {
            return this.current === 1;
        },
        noNext: function noNext() {
            return this.current === this.totalPages;
        },
        pages: function pages() {
            return getPages(this.current, this.totalPages, this.edgeNum, this.displayNum);
        },
        totalPages: function totalPages() {
            return getTotalPages(this.pageSize, this.total);
        }
    },
    created: function created() {
        document.addEventListener('click', function (e) {
            this.showPageSizeDropdown = false;
        }.bind(this), false);
    },
    methods: {
        isValidPageTo: function isValidPageTo(page) {
            var info;
            if (isNaN(page)) {
                info = '页码必须为数字!';
                console.error(info);
                this.$dispatch(COMPONENT_NS, { action: 'invalidNum', data: info }, name);
                return false;
            }
            if (page < 0 || page > this.totalPages) {
                info = '页码不在正确的范围内!';
                console.error(info);
                this.$dispatch(COMPONENT_NS, { action: 'invalidNum', data: info }, name);
                return false;
            }
            return true;
        },
        go: function go() {
            if (this.isValidPageTo(this.pageTo)) {
                this.current = +this.pageTo;
            } else {
                this.invalidCallback && this.invalidCallback(this.pageTo);
            }
            this.pageTo = void 666;
        },
        selectPage: function selectPage(num) {
            if (this.current != num && num > 0 && num <= this.totalPages) {
                this.current = num;
                this.$emit('page-change');
            }
        },
        selectSize: function selectSize(size) {
            if (this.pageSize != size && size > 0) {
                this.pageSize = size;
                if (this.current > this.totalPages) {
                    this.selectPage(this.totalPages);
                } else {
                    this.$emit('page-change');
                }
            }
        },
        togglePageSizeDropdown: function togglePageSizeDropdown() {
            this.showPageSizeDropdown = !this.showPageSizeDropdown;
        },
        handlePageSizeChange: function handlePageSizeChange(p) {
            this.pageSize = p;
            this.current = 1;
            this.onPageSizeChange && this.onPageSizeChange();
        }
    },
    watch: {
        'simple': function simple(val) {
            if (val) {
                this.jumpable = false;
                this.pageSizeEditable = false;
            } else {
                this.jumpable = true;
                this.pageSizeEditable = true;
            }
        },
        'pageTo': function pageTo(val) {
            if (val === void 0) return;
            if (!this.isValidPageTo(val)) {
                this.errPageTo = true;
            } else {
                this.errPageTo = false;
            }
            this.onPageChange && this.onPageChange();
        }
    },
    beforeDestroy: function beforeDestroy() {}
};

/**
 * @工具方法
 * 集日月之精华... 
 * 好吧，抄来的...
 */

function getTotalPages(pageSize, total) {
    var totalPages = pageSize < 1 ? 1 : Math.ceil(total / pageSize);
    return Math.max(totalPages || 0, 1);
}

// Create page object used in template
function makePage(number, text, isActive) {
    return {
        number: number,
        text: text,
        disabled: number === -1
    };
}

/**
 * Calculate start and end point of pagination links depending on
 * current and num_display_entries.
 * @return {Array}
 */
function getInterval(current, pageCount, num_display_entries) {
    //var num_display_entries = 6
    var ne_half = Math.ceil(num_display_entries / 2);
    var np = pageCount;
    var upper_limit = np - num_display_entries;
    var start = current > ne_half ? Math.max(Math.min(current - ne_half, upper_limit), 0) : 0;
    var end = current > ne_half ? Math.min(current + ne_half, np) : Math.min(num_display_entries, np);
    return [start, end];
}

function getPages(current, totalPages, num_edge_entries, num_display_entries) {
    var ret = [];
    //var num_edge_entries = 2
    var skip_text = '...';
    var np = totalPages;
    var interval = getInterval(current - 1, totalPages, num_display_entries);

    // Generate starting points
    if (interval[0] > 0 && num_edge_entries > 0) {
        var end = Math.min(num_edge_entries, interval[0]);
        for (var i = 0; i < end; i++) {
            var page = makePage(i + 1, i + 1);
            ret.push(page);
        }
        if (num_edge_entries < interval[0]) {
            var page = makePage(-1, skip_text);
            ret.push(page);
        }
    }
    // Generate interval links
    for (var i = interval[0]; i < interval[1]; i++) {
        var page = makePage(i + 1, i + 1);
        ret.push(page);
    }
    // Generate ending points
    if (interval[1] < np && num_edge_entries > 0) {
        if (np - num_edge_entries > interval[1]) {
            var page = makePage(-1, skip_text);
            ret.push(page);
        }
        var begin = Math.max(np - num_edge_entries, interval[1]);
        for (var i = begin; i < np; i++) {
            var page = makePage(i + 1, i + 1);
            ret.push(page);
        }
    }

    return ret;
}
// </script>

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _Pagination = __webpack_require__(1);

var _Pagination2 = _interopRequireDefault(_Pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _Pagination2.default;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=build.js.map