/**
 * vue-autocomplete-suggestions v0.0.2
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
    }, 'input', _vm.$attrs, false), _vm.listeners)), _vm._v(" "), _c('div', {
      staticStyle: {
        "position": "relative"
      }
    }, [_c('div', {
      staticStyle: {
        "position": "absolute"
      }
    }, [_vm._t("suggestions")], 2)])]);
  },
  staticRenderFns: [],
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

module.exports = Autocomplete;
