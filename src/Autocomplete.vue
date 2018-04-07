<template>
  <section v-click-outside="hideSuggestions">
    <!-- some explanations for the input:
    1. ':value="value"': Use the received as props
        for the input element

    2. 'v-bind="$attrs"': Bind attributes like placeholder
        to the input element instead of the section element
        (which would be the default)

    3. 'v-on="listeners"': We modify the input listener and
        emit the input event when someone types something
        into the input instead of the section element
        (which would be the default). This allows us to do
        things like: <vue-autocomplete @input="someFunction">
    -->
    <input type="text" :value="value" v-bind="$attrs" v-on="listeners" ref="input" @focus="showSuggestions=true" @keydown.up="decrementSelectedIndex" @keydown.down="incrementSelectedIndex">

    <ul class="vue-autocomplete-suggestions" v-show="showSuggestions" ref="suggestions">
      <template v-if="suggestions.length>0">
        <li v-for="(suggestion, index) in suggestions" :key="getSuggestionText(suggestion)" @click.stop="selectSuggestion(suggestion)" @mouseover="selectedIndex=index" @mouseleave="selectedIndex=-1">
          <component :is="suggestionComponent" :suggestion="suggestion" :active="index===selectedIndex"></component>
        </li>
      </template>

      <template v-else>
        <li>
          <slot name="noSuggestionFoundComponent">no suggestion found</slot>
        </li>
      </template>
    </ul>
  </section>
</template>

<script lang="ts">
import Vue, { VNode } from 'vue'

interface Data {
  selectedIndex: number
  showSuggestions: boolean
}

type Suggestion = any

export default Vue.extend({
  name: 'vue-autocomplete',
  inheritAttrs: false, // bind attributes to the input tag (see 2.)
  props: {
    value: {
      type: String,
      required: true,
    },
    suggestions: {
      type: Array,
      required: true,
    },
    suggestionComponent: {
      required: true,
    },
    /**
      this function returns the value that will be the value
      of the input element when the suggestionComponent is clicked.
      because it is unique, its return value is also used as a key
      for the suggestion (see <li :key="getSuggestionText(suggestion)">)
    */
    getSuggestionText: {
      type: Function,
      default(suggestion: Suggestion) {
        return JSON.stringify(suggestion)
      },
    },
  },
  directives: {
    clickOutside: {
      isFn: true,
      bind(element: any, binding: any, vnode: VNode) {
        element.event = (event: Event) => {
          const { input, suggestions } = vnode.context!.$refs

          // check if the click was outside the input and outside the suggestions list
          if (input !== event.target && suggestions !== event.target) {
            // if it was, call method provided in attribute value
            // @ts-ignore
            vnode.context[binding.expression](event)
          }
        }
        document.body.addEventListener('click', element.event)
      },
      unbind(element: any) {
        document.body.removeEventListener('click', element.event)
      },
    },
  },
  data() {
    return {
      selectedIndex: -1,
      showSuggestions: true,
    }
  },
  computed: {
    listeners(): any {
      return {
        ...this.$listeners,
        input: (event: any) => this.$emit('input', event.target.value),
      }
    },
  },
  methods: {
    hideSuggestions() {
      this.showSuggestions = false
      this.selectedIndex = -1
    },
    selectSuggestion(suggestion: Suggestion) {
      this.hideSuggestions()
      // @ts-ignore (see https://github.com/vuejs/vue/pull/6856)
      const value = this.getSuggestionText(suggestion)
      this.$emit('input', value)
    },
    incrementSelectedIndex() {
      this.selectedIndex = Math.min(
        this.selectedIndex + 1,
        // @ts-ignore (see https://github.com/vuejs/vue/pull/6856)
        this.suggestions.length
      )
    },
    decrementSelectedIndex() {
      this.selectedIndex = Math.max(this.selectedIndex - 1, -1)
    },
  },
})
</script>

<style>
html,
body {
  height: 100%;
}

ul.vue-autocomplete-suggestions {
  position: absolute;
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;
}

ul.vue-autocomplete-suggestions li {
  list-style: none;
  cursor: pointer;
}
</style>
