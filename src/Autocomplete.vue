<template>
  <section
    v-click-outside="hideSuggestions"
    class="vue-autocomplete__wrapper">
    <div>
      <!-- some explanations for the input:
      1. 'v-bind="$attrs"': Bind attributes like placeholder
          to the input element instead of the section element
          (which would be the default)

      2. ':value="value"': Use the value received as props
          for the input element

      3. 'v-on="listeners"': We modify the input listener and
          emit the input event when someone types something
          into the input instead of the section element
          (which would be the default). This allows us to do
          things like: <vue-autocomplete @input="someFunction">
      -->
      <input
        ref="input"
        v-bind="$attrs"
        :value="value"
        type="text"
        v-on="listeners"
        @focus="showSuggestions=true"
        @input="showSuggestions=true"
        @keydown.up="decrementSelectedIndex"
        @keydown.down="incrementSelectedIndex"
        @keydown.enter="selectSuggestion(suggestions[selectedIndex])">

      <!-- Image by Font Awesome (http://fontawesome.io), License: CC BY 4.0 -->
      <img
        v-show="value!==''"
        ref="resetSearch"
        src="./resetSearchIcon.svg"
        alt="reset search"
        @click="resetSearch">
    </div>

    <ul
      v-show="showSuggestions"
      ref="suggestions"
      class="vue-autocomplete__suggestions">
      <template v-if="suggestions.length>0">
        <li
          v-for="(suggestion, index) in suggestions"
          :key="getSuggestionText(suggestion)"
          :class="{active: selectedIndex===index}"
          class="vue-autocomplete__suggestion"
          @click="selectSuggestion(suggestion)"
          @mouseover="selectedIndex=index"
        >
          <component
            :is="suggestionComponent"
            :suggestion="suggestion"
            :active="index===selectedIndex" />
        </li>
      </template>
      <template v-else>
        <li> no suggestion found </li>
      </template>
    </ul>
  </section>
</template>

<script lang="ts">
import Vue, { VNode } from 'vue'
import DefaultSuggestionComponent from './DefaultSuggestionComponent.vue'

interface Data {
  selectedIndex: number
  showSuggestions: boolean
}

type Suggestion = any

export default Vue.extend({
  name: 'VueAutocomplete',
  directives: {
    /** detect a click outside of the input and the suggestions
     to hide the suggestions */
    clickOutside: {
      isFn: true,
      bind(element: any, binding: any, vnode: VNode) {
        element.event = (event: Event) => {
          const { input, resetSearch, suggestions } = vnode.context!.$refs

          // check if the click was outside the components
          if (
            input !== event.target &&
            resetSearch !== event.target &&
            suggestions !== event.target
          ) {
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
      default: DefaultSuggestionComponent,
      type: Function,
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
  data(): Data {
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
      this.showSuggestions = true
      this.selectedIndex = Math.min(
        this.selectedIndex + 1,
        // @ts-ignore (see https://github.com/vuejs/vue/pull/6856)
        this.suggestions.length
      )
    },
    decrementSelectedIndex() {
      this.selectedIndex = Math.max(this.selectedIndex - 1, -1)
    },
    resetSearch() {
      this.$emit('input', '')
      const inputElement = this.$refs.input as HTMLInputElement
      inputElement.focus()
    },
  },
})
</script>

<style>
html,
body {
  height: 100%;
}
.vue-autocomplete__wrapper {
  position: relative;
}

.vue-autocomplete__wrapper > div img {
  position: absolute;
  height: 0.85rem;
  width: 0.85rem;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  padding: 0.2rem;
}

.vue-autocomplete__wrapper input {
  width: 100%;
  box-sizing: border-box;
}

ul.vue-autocomplete__suggestions {
  position: absolute;
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;
  width: 100%;
  overflow-y: auto;
  max-height: 300px;
}

ul.vue-autocomplete__suggestions > li {
  list-style: none;
  cursor: pointer;
  width: 100%;
  user-select: none;
}

.vue-autocomplete__suggestion.active {
  background: #007fff;
  color: #ffffff;
  transition: all 0.04s;
}
</style>
