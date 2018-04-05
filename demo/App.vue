<!-- TODO: sort animals and remove ids-->
<template>
  <section id="start">
    <vue-autocomplete v-model="searchValue" :suggestions="suggestions" :getLabel="getLabel">
      <span slot="suggestionComponent" slot-scope="animal">{{animal}}</span>
    </vue-autocomplete>
  </section>
</template>

<script>
import Vue from 'vue'
import { animals } from './animals.json' // sample search data
import VueAutocomplete from '../src'

export default {
  name: 'app',
  components: {
    VueAutocomplete,
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
    getLabel(animal) {
      return animal.name
    },
  },
}
</script>
