import Autocomplete from './Autocomplete.vue'

export default {
  install(Vue, options) {
    Vue.component(Autocomplete.name, Autocomplete)
  },
}
