<!-- TODO: sort animals and remove ids-->
<template>
  <vue-autocomplete v-model="searchValue" :suggestion-source="filteredAnimals" :get-suggestion-text="getSuggestionText">
    <li slot="suggestionComponent" slot-scope="{suggestion}">{{ suggestion.name }}</li>
    <span slot="misc-item-below" slot-scope="{suggestions}" v-if="suggestions.length===0">
      No results
    </span>
  </vue-autocomplete>
</template>

<script>
import { animals } from './animals.json' // sample search data
import VueAutocomplete from '../src'
import suggestionComponent from './SuggestionComponent.vue'

export default {
  name: 'App',
  components: {
    VueAutocomplete,
    suggestionComponent,
  },
  data() {
    return {
      searchValue: '',
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
  margin: 1rem;
}
.vue-autocomplete {
  width: 300px;
}
li,
.misc-item-below {
  padding: 2px 4px;
}
li:first-of-type,
.misc-item-below {
  padding-top: 4px;
}
</style>
