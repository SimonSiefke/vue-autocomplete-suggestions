<!-- TODO: sort animals and remove ids-->
<template>
  <section id="start">
    <vue-autocomplete v-model="searchValue" :suggestions="suggestions" :getSuggestionText="getSuggestionText" :suggestionComponent="$options.components.suggestionComponent" />
  </section>
</template>

<script>
import { animals } from './animals.json' // sample search data
import VueAutocomplete from '../src'
import suggestionComponent from './SuggestionComponent.vue'

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
