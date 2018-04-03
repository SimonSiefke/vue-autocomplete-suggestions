<template>
  <section id="start">
    <vue-autocomplete v-model="searchValue">
      <ul slot="suggestions">
        <li v-for="animal in suggestions" :key="animal.id" @click="searchValue=animal.name">
          <span>
            {{animal.name}}
          </span>
        </li>
      </ul>
    </vue-autocomplete>
  </section>
</template>

<script>
import Vue from 'vue'
import { animals } from './animals.json' // search data

export default {
  name: 'app',
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
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.flip-list-move {
  transition: transform 0.5s;
}
section {
  position: relative;
}

.suggestions {
  position: relative;
}
ul {
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
}
li {
  list-style-type: none;
}
</style>
