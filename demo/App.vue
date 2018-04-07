<!-- TODO: sort animals and remove ids-->
<template>
  <section id="start">
    <!-- <vue-autocomplete v-model="searchValue" :suggestions="suggestions" :getLabel="getLabel">
      <span slot="suggestionComponent" slot-scope="animal" :style="{'color':animal.active ? 'red':'green'}">{{animal}}</span>
    </vue-autocomplete> -->
    <vue-autocomplete v-model="searchValue" :suggestions="suggestions" :getSuggestionText="getSuggestionText" :suggestionComponent="$options.components.suggestionComponent">

    </vue-autocomplete>
  </section>
</template>

<script>
import Vue from 'vue'
import { animals } from './animals.json' // sample search data
import VueAutocomplete from '../src'
import suggestionComponent from './SuggestionComponent'

export default {
  name: 'app',
  components: {
    VueAutocomplete,
    suggestionComponent,
  },
  data() {
    return {
      searchValue: '',
      animals,
      suggestionComponent,
    }
  },
  computed: {
    suggestions() {
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
  },
}
</script>
