<!-- TODO: sort animals and remove ids-->
<template>
  <section id="start">
    <vue-autocomplete v-model="searchValue" :suggestions="suggestions" :getSuggestionText="getSuggestionText" :suggestionComponent="$options.components.suggestionComponent" />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { animals } from './animals.json' // sample search data
import VueAutocomplete from '../src/index'
import suggestionComponent from './SuggestionComponent.vue'

interface Animal {
  name: string
  id: number
  description: string
}

interface Data {
  searchValue: string
  animals: Animal[]
  suggestionComponent: any
}

export default Vue.extend({
  name: 'app',
  components: {
    VueAutocomplete,
    suggestionComponent,
  },
  data(): Data {
    return {
      searchValue: '',
      animals,
      suggestionComponent,
    }
  },
  computed: {
    suggestions(): Animal[] {
      return this.animals.filter(animal => {
        const searchValueRegex = new RegExp(this.searchValue, 'i')
        return searchValueRegex.test(animal.name)
      })
    },
  },
  methods: {
    getSuggestionText(animal: Animal) {
      return animal.name
    },
  },
})
</script>
