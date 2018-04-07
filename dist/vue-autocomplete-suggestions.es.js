import Vue from 'vue';

var __assign = undefined && undefined.__assign || Object.assign || function (t) {
  for (var s, i = 1, n = arguments.length; i < n; i++) {
    s = arguments[i];

    for (var p in s) {
      if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
  }

  return t;
};
var Autocomplete = Vue.extend({
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
      }]
    }, [_c('input', _vm._g(_vm._b({
      ref: "input",
      attrs: {
        "type": "text"
      },
      domProps: {
        "value": _vm.value
      },
      on: {
        "focus": function focus($event) {
          _vm.showSuggestions = true;
        },
        "keydown": [function ($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "up", 38, $event.key, ["Up", "ArrowUp"])) {
            return null;
          }

          return _vm.decrementSelectedIndex($event);
        }, function ($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "down", 40, $event.key, ["Down", "ArrowDown"])) {
            return null;
          }

          return _vm.incrementSelectedIndex($event);
        }]
      }
    }, 'input', _vm.$attrs, false), _vm.listeners)), _vm._v(" "), _c('ul', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.showSuggestions,
        expression: "showSuggestions"
      }],
      staticClass: "vue-autocomplete-suggestions"
    }, [_vm.suggestions.length > 0 ? _vm._l(_vm.suggestions, function (suggestion, index) {
      return _c('li', {
        key: _vm.getSuggestionText(suggestion),
        on: {
          "click": function click($event) {
            $event.stopPropagation();

            _vm.selectSuggestion(suggestion);
          },
          "mouseover": function mouseover($event) {
            _vm.selectedIndex = index;
          },
          "mouseleave": function mouseleave($event) {
            _vm.selectedIndex = -1;
          }
        }
      }, [_c(_vm.suggestionComponent, {
        tag: "component",
        attrs: {
          "suggestion": suggestion,
          "active": index === _vm.selectedIndex
        }
      })], 1);
    }) : [_c('li', [_vm._t("noSuggestionFoundComponent", [_vm._v("no suggestion found")])], 2)]], 2)]);
  },
  staticRenderFns: [],
  name: 'vue-autocomplete',
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      required: true
    },
    suggestions: {
      type: Array,
      required: true
    },
    suggestionComponent: {
      required: true
    },

    /**
      this function returns the value that will be the value
      of the input element when the suggestionComponent is clicked.
      because it is unique, its return value is also used as a key
      for the suggestion (see <li :key="getSuggestionText(suggestion)">)
    */
    getSuggestionText: {
      type: Function,
      "default": function _default(suggestion) {
        return JSON.stringify(suggestion);
      }
    }
  },
  directives: {
    clickOutside: {
      bind: function bind(element, binding, vnode) {
        element.event = function (event) {
          // check if the click was outside the element and its childrens
          if (element !== event.target && !element.contains(event.target)) {
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
  data: function data() {
    return {
      selectedIndex: -1,
      showSuggestions: true
    };
  },
  computed: {
    listeners: function listeners() {
      var _this = this;

      return __assign({}, this.$listeners, {
        input: function input(event) {
          return _this.$emit('input', event.target.value);
        }
      });
    }
  },
  methods: {
    hideSuggestions: function hideSuggestions() {
      this.showSuggestions = false;
      this.selectedIndex = -1;
    },
    selectSuggestion: function selectSuggestion(suggestion) {
      this.hideSuggestions(); // @ts-ignore (see https://github.com/vuejs/vue/pull/6856)

      var value = this.getSuggestionText(suggestion);
      this.$emit('input', value);
    },
    incrementSelectedIndex: function incrementSelectedIndex() {
      this.selectedIndex = Math.min(this.selectedIndex + 1, // @ts-ignore (see https://github.com/vuejs/vue/pull/6856)
      this.suggestions.length);
    },
    decrementSelectedIndex: function decrementSelectedIndex() {
      this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
    }
  }
});

export default Autocomplete;
