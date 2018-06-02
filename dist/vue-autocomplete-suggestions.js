(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (factory((global.vueAutocompleteSuggestions = {}),global.Vue));
}(this, (function (exports,Vue) { 'use strict';

  Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

  var DefaultSuggestionComponent = Vue.extend({render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',[_vm._v(_vm._s(_vm.suggestion))])},staticRenderFns: [],
      props: {
          suggestion: {
              type: [Object, Number, String],
              required: true
          },
          active: {
              type: Boolean,
              required: true
          }
      }
  });

  var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
      }
      return t;
  };
  var DefaultSearchField = Vue.extend({render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"default-search-field",class:_vm.size},[_c('input',_vm._b({},'input',_vm.inputAttributes,false))])},staticRenderFns: [],
      inheritAttrs: false,
      props: {
          size: {
              "default": 'large',
              type: String
          }
      },
      computed: {
          inputAttributes: function () {
              return __assign({ type: 'text', autocomplete: 'off' }, this.$attrs);
          }
      }
  });

  var __assign$1 = (undefined && undefined.__assign) || Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
      }
      return t;
  };
  var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  };
  var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
      var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
      function verb(n) { return function (v) { return step([n, v]); }; }
      function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (_) try {
              if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
              if (y = 0, t) op = [0, t.value];
              switch (op[0]) {
                  case 0: case 1: t = op; break;
                  case 4: _.label++; return { value: op[1], done: false };
                  case 5: _.label++; y = op[1]; op = [0]; continue;
                  case 7: op = _.ops.pop(); _.trys.pop(); continue;
                  default:
                      if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                      if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                      if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                      if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                      if (t[2]) _.ops.pop();
                      _.trys.pop(); continue;
              }
              op = body.call(thisArg, _);
          } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
          if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
      }
  };
  var Autocomplete = Vue.extend({render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{directives:[{name:"click-outside",rawName:"v-click-outside",value:(_vm.hideSuggestions),expression:"hideSuggestions"}],staticClass:"vue-autocomplete"},[_c('div',_vm._g({ref:"inputWrapper"},_vm.inputListeners),[_vm._t("default",[_c('default-search-field')])],2),_vm._v(" "),_c('ul',{directives:[{name:"show",rawName:"v-show",value:(_vm.showSuggestions),expression:"showSuggestions"}],ref:"suggestions",staticClass:"suggestions"},[(this.$slots['misc-item-above'])?_c('div',{staticClass:"misc-item-above"},[_vm._t("misc-item-above",null,{suggestions:_vm.suggestions})],2):_vm._e(),_vm._v(" "),_vm._l((_vm.suggestions),function(suggestion,index){return _c('li',{key:_vm.getSuggestionText(suggestion),staticClass:"search-suggestion",class:{'is-hovered': _vm.hoverIndex===index},on:{"click":function($event){_vm.selectSuggestion(suggestion);},"mouseover":function($event){_vm.hoverIndex = index;},"mouseleave":function($event){_vm.hoverIndex = -1;}}},[_vm._t("suggestionComponent",[_c('default-suggestion-component',_vm._b({},'default-suggestion-component',{suggestion: suggestion, active: _vm.hoverIndex===index},false))],null,{suggestion: suggestion, active: _vm.hoverIndex===index})],2)}),_vm._v(" "),(this.$slots['misc-item-below'])?_c('div',{staticClass:"misc-item-below"},[_vm._t("misc-item-below",null,{suggestions:_vm.suggestions})],2):_vm._e()],2)])},staticRenderFns: [],
      name: 'VueAutocomplete',
      components: {
          DefaultSuggestionComponent: DefaultSuggestionComponent,
          DefaultSearchField: DefaultSearchField
      },
      directives: {
          /** detect a click outside of the input and the suggestions
           to hide the suggestions */
          clickOutside: {
              isFn: true,
              bind: function (element, binding, vnode) {
                  element.event = function (event) {
                      var _a = vnode.context.$refs, inputWrapper = _a.inputWrapper, suggestions = _a.suggestions;
                      // check if the click was outside the components
                      if (
                      // @ts-ignore
                      !inputWrapper.contains(event.target) &&
                          // @ts-ignore
                          !suggestions.contains(event.target)) {
                          // if it was, call method provided in attribute value
                          // @ts-ignore
                          vnode.context[binding.expression](event);
                      }
                  };
                  document.body.addEventListener('click', element.event);
              },
              unbind: function (element) {
                  document.body.removeEventListener('click', element.event);
              }
          }
      },
      inheritAttrs: false,
      props: {
          cacheResults: {
              type: Boolean,
              "default": true
          },
          getSuggestionText: {
              type: Function,
              "default": function (suggestion) {
                  if (typeof suggestion === 'string') {
                      return suggestion;
                  }
                  return JSON.stringify(suggestion);
              }
          },
          suggestionSource: {
              type: [Array, Function],
              required: true
          },
          value: {
              type: [String, Number],
              required: true
          }
      },
      data: function () {
          return {
              showSuggestions: false,
              hoverIndex: -1,
              suggestions: [],
              // if suggestions source is an async function,
              // save the result for each input inside this cache
              suggestionCache: {},
              inputElement: null,
              isMakingRequest: false
          };
      },
      computed: {
          inputAttributes: function () {
              return __assign$1({ autocomplete: 'off', type: 'text' }, this.$attrs, { id: 'red', 
                  // @ts-ignore
                  value: this.value });
          },
          inputComponent: function () {
              if (this.$slots["default"] && !!this.$slots["default"][0].componentInstance) {
                  return this.$slots["default"][0].componentInstance;
              }
          },
          inputListeners: function () {
              var _this = this;
              var nativeListeners = __assign$1({}, this.$listeners, { click: function (event) {
                      _this.handleClick();
                      _this.$emit('click', event);
                  }, keydown: function (event) {
                      var key = event.keyCode;
                      var selectionUpKeys = [33, 38];
                      var selectionDownKeys = [34, 40];
                      var selectKeys = [9, 13, 36];
                      var hideSuggestionsKeys = [27, 35];
                      if (selectionUpKeys.includes(key)) {
                          _this.handleKeyUp();
                      }
                      else if (selectionDownKeys.includes(key)) {
                          _this.handleKeyDown();
                      }
                      else if (selectKeys.includes(key)) {
                          _this.handleKeyEnter();
                      }
                      else if (hideSuggestionsKeys.includes(key)) {
                          _this.handleKeyEscape();
                      }
                      _this.$emit('keydown', event);
                  } });
              // @ts-ignore
              delete nativeListeners.select;
              return nativeListeners;
          }
      },
      watch: {
          value: {
              immediate: true,
              handler: function (newValue) {
                  if (this.inputElement) {
                      // @ts-ignore
                      this.inputElement.value = this.value;
                  }
                  if (newValue === '') {
                      this.showSuggestions = false;
                  }
              }
          },
          // TODO: evaluate if this is necessary or can be done with less code
          suggestionSource: {
              handler: function (newSource) {
                  return __awaiter(this, void 0, void 0, function () {
                      var _a, error_1;
                      return __generator(this, function (_b) {
                          switch (_b.label) {
                              case 0:
                                  this.clearCache();
                                  console.log('new suggestion source');
                                  _b.label = 1;
                              case 1:
                                  _b.trys.push([1, 3, , 4]);
                                  _a = this;
                                  return [4 /*yield*/, this.getSuggestions()];
                              case 2:
                                  _a.suggestions = _b.sent();
                                  return [3 /*break*/, 4];
                              case 3:
                                  error_1 = _b.sent();
                                  console.error(error_1);
                                  return [3 /*break*/, 4];
                              case 4: return [2 /*return*/];
                          }
                      });
                  });
              }
          }
      },
      mounted: function () {
          var _this = this;
          var inputWrapper = this.$refs.inputWrapper;
          this.inputElement = inputWrapper.querySelector('input');
          // @ts-ignore
          this.inputElement.value = this.value;
          // @ts-ignore
          this.inputElement.addEventListener('focus', function () {
              _this.$emit('focus');
          });
          this.inputElement.addEventListener('input', function (event) {
              event.preventDefault();
              event.stopPropagation();
              var newValue = event.target.value;
              // @ts-ignore
              if (_this.value !== newValue) {
                  _this.$emit('input', newValue);
                  _this.handleInput(newValue);
              }
          });
      },
      methods: {
          clearCache: function () {
              this.suggestionCache = {};
          },
          getSuggestions: function () {
              return __awaiter(this, void 0, void 0, function () {
                  var inputValue, newSuggestions, error_2, result, error_3;
                  return __generator(this, function (_a) {
                      switch (_a.label) {
                          case 0:
                              // @ts-ignore
                              if (Array.isArray(this.suggestionSource)) {
                                  // @ts-ignore
                                  return [2 /*return*/, this.suggestionSource];
                              }
                              if (!(typeof this.suggestionSource === 'function')) return [3 /*break*/, 10];
                              if (!this.cacheResults) return [3 /*break*/, 5];
                              inputValue = this.inputElement.value;
                              if (this.suggestionCache[inputValue]) {
                                  return [2 /*return*/, this.suggestionCache[inputValue]];
                              }
                              this.isMakingRequest = true;
                              newSuggestions = void 0;
                              _a.label = 1;
                          case 1:
                              _a.trys.push([1, 3, , 4]);
                              return [4 /*yield*/, this.suggestionSource()];
                          case 2:
                              // @ts-ignore
                              newSuggestions = _a.sent();
                              return [3 /*break*/, 4];
                          case 3:
                              error_2 = _a.sent();
                              console.error(error_2);
                              return [3 /*break*/, 4];
                          case 4:
                              this.isMakingRequest = false;
                              this.suggestionCache[inputValue] = newSuggestions;
                              return [2 /*return*/, newSuggestions];
                          case 5:
                              this.isMakingRequest = true;
                              result = void 0;
                              _a.label = 6;
                          case 6:
                              _a.trys.push([6, 8, , 9]);
                              return [4 /*yield*/, this.suggestionSource()];
                          case 7:
                              // @ts-ignore
                              result = _a.sent();
                              return [3 /*break*/, 9];
                          case 8:
                              error_3 = _a.sent();
                              console.error(error_3);
                              return [3 /*break*/, 9];
                          case 9:
                              this.isMakingRequest = false;
                              return [2 /*return*/, result];
                          case 10: throw new Error('invalid suggestion source');
                      }
                  });
              });
          },
          handleClick: function () {
              return __awaiter(this, void 0, void 0, function () {
                  var _a;
                  return __generator(this, function (_b) {
                      switch (_b.label) {
                          case 0:
                              if (!(this.value !== '')) return [3 /*break*/, 2];
                              _a = this;
                              return [4 /*yield*/, this.getSuggestions()];
                          case 1:
                              _a.suggestions = _b.sent();
                              this.showSuggestions = true;
                              _b.label = 2;
                          case 2: return [2 /*return*/];
                      }
                  });
              });
          },
          handleKeyDown: function () {
              // if its at the bottom, move to top
              // if its not at the bottom move down by 1
              // @ts-ignore
              this.showSuggestions = true;
              this.hoverIndex = (this.hoverIndex + 1) % this.suggestions.length;
          },
          handleKeyEnter: function () {
              // console.log('eneter')
              var index = this.hoverIndex;
              // @ts-ignore
              if (0 <= index && index < this.suggestions.length) {
                  // @ts-ignore
                  var currentSuggestion = this.suggestions[index];
                  // TODO: remove side effect
                  this.selectSuggestion(currentSuggestion);
              }
          },
          handleKeyEscape: function () {
              this.hideSuggestions();
              this.inputElement.blur();
          },
          handleKeyUp: function () {
              // if its at the top, move to bottom
              // if its not at the top move up by 1
              this.hoverIndex =
                  // @ts-ignore
                  (this.hoverIndex - 1 + this.suggestions.length) %
                      // @ts-ignore
                      this.suggestions.length;
          },
          handleInput: function (newValue) {
              return __awaiter(this, void 0, void 0, function () {
                  var _a, error_4;
                  return __generator(this, function (_b) {
                      switch (_b.label) {
                          case 0:
                              console.log('handle input');
                              _b.label = 1;
                          case 1:
                              _b.trys.push([1, 3, , 4]);
                              _a = this;
                              return [4 /*yield*/, this.getSuggestions()];
                          case 2:
                              _a.suggestions = _b.sent();
                              return [3 /*break*/, 4];
                          case 3:
                              error_4 = _b.sent();
                              console.error(error_4);
                              return [3 /*break*/, 4];
                          case 4:
                              this.showSuggestions = true;
                              this.hoverIndex = -1;
                              return [2 /*return*/];
                      }
                  });
              });
          },
          hideSuggestions: function () {
              if (this.showSuggestions) {
                  this.showSuggestions = false;
                  this.hoverIndex = -1;
              }
          },
          selectSuggestion: function (suggestion) {
              this.hideSuggestions();
              // @ts-ignore
              this.$emit('input', this.getSuggestionText(suggestion));
              this.$emit('select', suggestion);
              // @ts-ignore
              this.inputElement.value = this.getSuggestionText(suggestion);
              this.inputElement.blur();
          }
      }
  });

  exports.VueAutocomplete = Autocomplete;
  exports.DefaultSearchField = DefaultSearchField;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
