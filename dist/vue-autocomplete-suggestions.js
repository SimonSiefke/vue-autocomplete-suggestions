(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global.vueAutocompleteSuggestions = factory(global.Vue));
}(this, (function (Vue) { 'use strict';

  Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

  var DefaultSuggestionComponent = Vue.extend({
    render: function render() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('span', [_vm._v(_vm._s(JSON.stringify(_vm.props.suggestion)) + " " + _vm._s(_vm.props.active))]);
    },
    staticRenderFns: [],
    props: {
      suggestion: {
        required: true,
        type: [Number, Object, Array, String]
      },
      active: {
        type: Boolean,
        required: true
      }
    }
  });

  var __assign = undefined && undefined.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };
  var MinAutocomplete = Vue.extend({
    render: function render() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('section', {
        directives: [{
          name: "click-outside",
          rawName: "v-click-outside",
          value: _vm.hideSuggestions,
          expression: "hideSuggestions"
        }],
        staticClass: "vue-autocomplete"
      }, [_c('div', [_c('input', _vm._g(_vm._b({
        ref: "input",
        attrs: {
          "type": "text"
        }
      }, 'input', _vm.inputAttributes, false), _vm.inputListeners)), _vm._v(" "), _c('img', {
        ref: "resetSearch",
        attrs: {
          "src": "./resetSearchIcon.svg",
          "alt": "reset search"
        },
        on: {
          "click": _vm.resetSearch
        }
      })]), _vm._v(" "), _c('ul', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.showSuggestions,
          expression: "showSuggestions"
        }],
        ref: "suggestions"
      }, [_vm._l(_vm.suggestions, function (suggestion, index) {
        return _c('li', {
          key: _vm.getSuggestionText(suggestion),
          ref: "suggestion",
          refInFor: true,
          on: {
            "click": function click($event) {
              _vm.selectSuggestion(suggestion);
            },
            "mouseover": function mouseover($event) {
              _vm.selectionIndex = index;
            },
            "mouseleave": function mouseleave($event) {
              _vm.selectionIndex = -1;
            }
          }
        }, [_c(_vm.suggestionComponent, {
          tag: "component",
          attrs: {
            "suggestion": suggestion,
            "active": index === _vm.selectionIndex
          }
        })], 1);
      }), _vm._v(" "), _vm.suggestions.length === 0 ? _c('li', {
        on: {
          "mouseover": function mouseover($event) {
            _vm.hovered = true;
          }
        }
      }, [_vm._v(" No results ")]) : _vm._e()], 2)]);
    },
    staticRenderFns: [],
    name: 'VueAutocomplete',
    directives: {
      /** detect a click outside of the input and the suggestions
       to hide the suggestions */
      clickOutside: {
        isFn: true,
        bind: function bind(element, binding, vnode) {
          element.event = function (event) {
            var _a = vnode.context.$refs,
                input = _a.input,
                resetSearch = _a.resetSearch,
                suggestions = _a.suggestions; // check if the click was outside the components

            if (input !== event.target && resetSearch !== event.target && // @ts-ignore
            !suggestions.contains(event.target)) {
              // if it was, call method provided in attribute value
              // @ts-ignore
              vnode.context[binding.expression](event);
            }
          };

          document.body.addEventListener('click', element.event);
        },
        unbind: function unbind(element) {
          document.body.removeEventListener('click', element.event);
        }
      }
    },
    inheritAttrs: false,
    props: {
      getSuggestionText: {
        type: Function,
        "default": function _default(suggestion) {
          return JSON.stringify(suggestion);
        }
      },
      suggestionComponent: {
        "default": DefaultSuggestionComponent,
        type: Function
      },
      suggestions: {
        type: Array,
        required: true
      },
      value: {
        type: String,
        required: true
      }
    },
    data: function data() {
      return {
        showSuggestions: false,
        selectionIndex: -1
      };
    },
    computed: {
      inputListeners: function inputListeners() {
        var _this = this;

        return __assign({}, this.$listeners, {
          input: function input(event) {
            _this.handleInput();

            _this.$emit('input', event.target.value);
          },
          click: function click(event) {
            _this.handleClick();

            _this.$emit('click', event);
          },
          keydown: function keydown(event) {
            var key = event.keyCode;
            var selectionUpKeys = [33, 38];
            var selectionDownKeys = [34, 40];
            var selectKeys = [13, 36];
            var hideSuggestionsKeys = [27, 35];

            if (selectionUpKeys.includes(key)) {
              _this.handleKeyUp();
            } else if (selectionDownKeys.includes(key)) {
              _this.handleKeyDown();
            } else if (selectKeys.includes(key)) {
              _this.handleKeyEnter();
            } else if (hideSuggestionsKeys.includes(key)) {
              _this.handleKeyEscape();
            }

            _this.$emit('keydown', event);
          }
        });
      },
      inputAttributes: function inputAttributes() {
        return __assign({}, this.$attrs, {
          // @ts-ignore
          value: this.value
        });
      }
    },
    watch: {
      value: function value(newValue) {
        if (newValue === '') {
          this.showSuggestions = false;
        }
      }
    },
    methods: {
      handleClick: function handleClick() {
        // @ts-ignore
        if (this.value !== '') {
          this.showSuggestions = true;
        }
      },
      handleKeyDown: function handleKeyDown() {
        // if its at the bottom, move to top
        // if its not at the bottom move up by 1
        // @ts-ignore
        this.selectionIndex = (this.selectionIndex + 1) % this.suggestions.length;
        this.scrollToCurrentSuggestion();
      },
      handleKeyEnter: function handleKeyEnter() {
        var index = this.selectionIndex; // @ts-ignore

        if (0 <= index && index < this.suggestions.length) {
          // @ts-ignore
          var currentSuggestion = this.suggestions[index]; // TODO: remove side effect

          this.selectSuggestion(currentSuggestion);
        }
      },
      handleKeyEscape: function handleKeyEscape() {
        this.hideSuggestions();
        var inputElement = this.$refs.input;
        inputElement.blur();
      },
      handleKeyUp: function handleKeyUp() {
        // if its at the top, move to bottom
        // if its not at the top move up by 1
        this.selectionIndex = // @ts-ignore
        (this.selectionIndex - 1 + this.suggestions.length) % // @ts-ignore
        this.suggestions.length;
        this.scrollToCurrentSuggestion();
      },
      handleInput: function handleInput() {
        this.showSuggestions = true;
        this.selectionIndex = -1;
      },
      hideSuggestions: function hideSuggestions() {
        console.log('hide');

        if (this.showSuggestions) {
          this.showSuggestions = false;
          this.selectionIndex = -1;
        }
      },
      resetSearch: function resetSearch() {
        this.$emit('input', ''); // @ts-ignore

        this.$refs.input.focus();
      },
      selectSuggestion: function selectSuggestion(suggestion) {
        this.hideSuggestions(); // @ts-ignore

        this.$emit('input', this.getSuggestionText(suggestion));
      },
      scrollToCurrentSuggestion: function scrollToCurrentSuggestion() {// TODO:
        // const suggestionItems = this.$refs.suggestionItems as any
        // const selectedSuggestionItem = suggestionItems[this.selectionIndex]
        // if (selectedSuggestionItem && selectedSuggestionItem.scrollIntoView) {
        //   selectedSuggestionItem.scrollIntoView(false)
        // }
      }
    }
  });

  // import Autocomplete from './Autocomplete.vue'

  return MinAutocomplete;

})));
