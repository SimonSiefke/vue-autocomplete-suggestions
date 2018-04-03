/**
 * vue-autocomplete-suggestions v0.0.1
 * (c) Simon Siefke <simon.siefke@gmail.com>
 * https://github.com/SimonSiefke/vue-autocomplete-suggestions
 * Released under the MIT License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.vueAutocompleteSuggestions = factory());
}(this, (function () { 'use strict';

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
      }, 'input', _vm.$attrs, false), _vm.listeners)), _vm._v(" "), _c('div', [_c('div', [_vm._t("suggestions")], 2)])]);
    },
    staticRenderFns: [],
    _scopeId: 'data-v-0e3ab061',
    name: 'vue-autocomplete',
    inheritAttrs: false,
    props: {
      value: {
        type: String,
        required: true
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
    }
  };

  var index = {
    install: function install(Vue, options) {
      Vue.component(Autocomplete.name, Autocomplete);
    }
  };

  return index;

})));
