/**
 * vue-autocomplete-suggestions v0.0.5
 * (c) Simon Siefke <simon.siefke@gmail.com>
 * https://github.com/SimonSiefke/vue-autocomplete-suggestions
 * Released under the MIT License.
 */

'use strict';

var Autocomplete = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('section', [_c('input', _vm._g(_vm._b({
      attrs: {
        "type": "text"
      },
      domProps: {
        "value": _vm.value
      }
    }, 'input', _vm.$attrs, false), _vm.listeners)), _vm._v(" "), _c('ul', {
      staticClass: "vue-autocomplete-suggestions"
    }, [_vm._l(_vm.suggestions, function (suggestion) {
      return [_c('li', {
        key: _vm.getLabel(suggestion),
        on: {
          "click": function click($event) {
            _vm.selectSuggestion(suggestion);
          }
        }
      }, [_vm._t("suggestionComponent", [_vm._v(" " + _vm._s(suggestion) + " ")], null, suggestion)], 2)];
    })], 2)]);
  },
  staticRenderFns: [],
  name: 'vue-autocomplete',
  inheritAttrs: false,
  // bind attributes to the input tag (see 1.)
  props: {
    value: {
      type: String,
      required: true
    },
    suggestions: {
      type: Array,
      required: true
    },

    /**
      this function returns the value that will be the value
      of the input element when the suggestionComponent is clicked.
      because it is unique, its return value is also used as a key
      for the suggestion (see <li :key="getLabel(suggestion)">)
    */
    getLabel: {
      type: Function,
      default: function _default(suggestion) {
        return JSON.stringify(suggestion);
      }
    }
  },
  computed: {
    listeners: function listeners() {
      var _this = this;

      return Object.assign({}, this.$listeners, {
        input: function input(event) {
          return _this.$emit('input', event.target.value);
        }
      });
    }
  },
  methods: {
    selectSuggestion: function selectSuggestion(suggestion) {
      var value = this.getLabel(suggestion);
      this.$emit('input', value);
    }
  }
};

module.exports = Autocomplete;
