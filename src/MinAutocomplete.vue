<template>
  <section class="vue-autocomplete" v-click-outside="hideSuggestions">
    <div>
      <input ref="input" v-bind="inputAttributes" v-on="inputListeners" type="text">
      <!-- Image by Font Awesome (http://fontawesome.io), License: CC BY 4.0 -->
      <img ref="resetSearch" src="./resetSearchIcon.svg" alt="reset search" @click="resetSearch">
    </div>

    <ul v-show="showSuggestions" ref="suggestions">
      <li v-for="(suggestion, index) in suggestions" :key="getSuggestionText(suggestion)" @click="selectSuggestion(suggestion)" @mouseover="selectionIndex = index" @mouseleave="selectionIndex = -1" ref="suggestion">
        <component :is="suggestionComponent" :suggestion="suggestion" :active="index===selectionIndex" />
      </li>
      <li v-if="suggestions.length===0" @mouseover="hovered=true">
        No results
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import Vue, { VNode } from 'vue'
import DefaultSuggestionComponent from './DefaultSuggestionComponent.vue'

interface Data {
  selectionIndex: number
  showSuggestions: boolean
  suggestions: any[]
}

type Suggestion = string | object | number

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
            // @ts-ignore
            !suggestions.contains(event.target)
          ) {
            console.log('outside')

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
  inheritAttrs: false,
  props: {
    getSuggestionText: {
      type: Function,
      default(suggestion: any) {
        return JSON.stringify(suggestion)
      },
    },
    suggestionComponent: {
      default: DefaultSuggestionComponent,
      type: Function,
    },
    suggestionSource: {
      type: [Array, Function],
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  data(): Data {
    return {
      showSuggestions: false,
      selectionIndex: -1,
      suggestions: [],
    }
  },
  computed: {
    inputListeners(): object {
      return {
        ...this.$listeners,
        input: (event: Event) => {
          this.handleInput()
          this.$emit('input', (event.target as HTMLInputElement).value)
        },
        click: (event: Event) => {
          this.handleClick()
          this.$emit('click', event)
        },
        keydown: (event: KeyboardEvent) => {
          const key = event.keyCode
          const selectionUpKeys = [33, 38]
          const selectionDownKeys = [34, 40]
          const selectKeys = [13, 36]
          const hideSuggestionsKeys = [27, 35]

          if (selectionUpKeys.includes(key)) {
            this.handleKeyUp()
          } else if (selectionDownKeys.includes(key)) {
            this.handleKeyDown()
          } else if (selectKeys.includes(key)) {
            this.handleKeyEnter()
          } else if (hideSuggestionsKeys.includes(key)) {
            this.handleKeyEscape()
          }

          this.$emit('keydown', event)
        },
      }
    },
    inputAttributes(): object {
      return {
        ...this.$attrs,
        // @ts-ignore
        value: this.value,
      }
    },
  },
  async created() {
    // @ts-ignore
    console.log(await this.suggestionSource())
  },
  watch: {
    value(newValue) {
      if (newValue === '') {
        this.showSuggestions = false
      }
    },
  },
  methods: {
    async getSuggestions(): Promise<Suggestion[]> {
      // @ts-ignore
      if (typeof this.suggestionSource === 'function') {
        // @ts-ignore
        return this.suggestionSource()
      }
      // @ts-ignore
      if (Array.isArray(this.suggestionSource)) {
        // @ts-ignore
        return this.suggestionSource
      }
      return []
    },
    handleClick() {
      // @ts-ignore
      if (this.value !== '') {
        this.showSuggestions = true
      }
    },
    handleKeyDown() {
      // if its at the bottom, move to top
      // if its not at the bottom move up by 1
      // @ts-ignore
      this.selectionIndex = (this.selectionIndex + 1) % this.suggestions.length
      this.scrollToCurrentSuggestion()
    },
    handleKeyEnter() {
      const index = this.selectionIndex
      // @ts-ignore
      if (0 <= index && index < this.suggestions.length) {
        // @ts-ignore
        const currentSuggestion = this.suggestions[index]
        // TODO: remove side effect
        this.selectSuggestion(currentSuggestion)
      }
    },
    handleKeyEscape() {
      this.hideSuggestions()
      const inputElement = this.$refs.input as HTMLInputElement
      inputElement.blur()
    },
    handleKeyUp() {
      // if its at the top, move to bottom
      // if its not at the top move up by 1
      this.selectionIndex =
        // @ts-ignore
        (this.selectionIndex - 1 + this.suggestions.length) %
        // @ts-ignore
        this.suggestions.length

      this.scrollToCurrentSuggestion()
    },
    async handleInput() {
      console.log('update')

      this.suggestions = await this.getSuggestions()
      console.log(this.suggestions)

      this.showSuggestions = true
      this.selectionIndex = -1
    },
    hideSuggestions() {
      console.log('hide')

      if (this.showSuggestions) {
        this.showSuggestions = false
        this.selectionIndex = -1
      }
    },
    resetSearch() {
      this.$emit('input', '')
      // @ts-ignore
      this.$refs.input.focus()
    },
    selectSuggestion(suggestion: any) {
      this.hideSuggestions()
      // @ts-ignore
      this.$emit('input', this.getSuggestionText(suggestion))
    },

    scrollToCurrentSuggestion() {
      // TODO:
      // const suggestionItems = this.$refs.suggestionItems as any
      // const selectedSuggestionItem = suggestionItems[this.selectionIndex]
      // if (selectedSuggestionItem && selectedSuggestionItem.scrollIntoView) {
      //   selectedSuggestionItem.scrollIntoView(false)
      // }
    },
  },
})
</script>

<style>
html,
body {
  height: 100%;
}
section {
  position: relative;
  width: 300px;
}

img {
  position: absolute;
  height: 0.85rem;
  width: 0.85rem;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  padding: 0.2rem;
}

input {
  width: 100%;
  box-sizing: border-box;
}
ul {
  position: absolute;
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;
  width: 100%;
  overflow-y: auto;
  max-height: 300px;
}

li {
  list-style: none;
  cursor: pointer;
  user-select: none;
}
</style>
