<!-- TODO: sort animals and remove ids-->
<template>
  <<<<<<< HEAD <vue-autocomplete v-model="searchValue" :suggestion-source="animals" @select="dodo">
    =======
    <vue-autocomplete v-model="searchValue" :suggestion-source="fetchAnimals" :get-suggestion-text="getSuggestionText" @select="searchValue++">
      >>>>>>> c9ce6cc84fd515103c1a9ad5b60d84bc4083ec7e
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
import { setInterval } from 'timers'

export default {
  name: 'App',
  components: {
    VueAutocomplete,
    suggestionComponent,
  },
  async mounted() {
    this.animals = await this.fetchAnimals()
    let i = 7
    setInterval(() => {
      this.animals = []
    }, 1000)
  },
  data() {
    return {
      searchValue: '22',
      animals: [1, 2, 3],
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
        resolve([1, 2, 3, 4, 5, 6])
        // setTimeout(() => resolve(this.filteredAnimals), 1000)
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
