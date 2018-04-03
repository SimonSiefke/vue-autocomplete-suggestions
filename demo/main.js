import Vue from 'vue'
import VueAutocomplete from '../src'
import App from './App'

Vue.use(VueAutocomplete)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
})
