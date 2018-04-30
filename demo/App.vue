<!-- TODO: sort animals and remove ids-->
<template>
  <vue-autocomplete v-model="searchValue" :suggestion-source="fetchAnimals" :get-suggestion-text="getSuggestionText" @select="dodo">
    <input type="text" placeholder="search ...">
    <li slot="misc-item-below" slot-scope="{suggestions}" v-if="suggestions.length===0">
      No results
    </li>
    <li slot="suggestionComponent" slot-scope="{suggestion}">{{suggestion}}</li>
  </vue-autocomplete>
</template>

<script>
import { animals } from './animals.json' // sample search data
import VueAutocomplete from '../src'
// import VueAutocomplete from '../dist/vue-autocomplete-suggestions.es.js'
// import '../dist/vue-autocomplete-suggestions.min.css'
import suggestionComponent from './SuggestionComponent.vue'

export default {
  name: 'App',
  components: {
    VueAutocomplete,
    suggestionComponent,
  },
  data() {
    return {
      searchValue: '22',
      animals,
    }
  },
  computed: {
    filteredAnimals() {
      return this.animals.filter(animal => {
        const searchValueRegex = new RegExp(this.searchValue, 'i')
        return searchValueRegex.test(animal.name)
      })
    },
  },
  methods: {
    dodo() {
      console.log('do ')
    },
    getSuggestionText(animal) {
      return animal.name
    },
    async fetchAnimals() {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(this.filteredAnimals), 1000)
      })
    },
  },
}
</script>

<style>
body {
  margin: 0;
}
.vue-autocomplete {
  width: 300px;
}

.vue-autocomplete > ul {
  border: 1px solid #c5c5c5;
}
</style>
