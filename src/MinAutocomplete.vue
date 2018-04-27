<template>
  <section class="vue-autocomplete" v-click-outside="hideSuggestions">
    <div ref="inputWrapper" v-bind="inputAttributes" v-on="inputListeners">
      <slot>
        <input type="text">
      </slot>
    </div>

    <ul v-show="showSuggestions" ref="suggestions">
      <slot name="misc-item-above" :suggestions="suggestions" />
      <li v-for="(suggestion, index) in suggestions" :key="getSuggestionText(suggestion)" @click="selectSuggestion(suggestion)" @mouseover="selectionIndex = index" @mouseleave="selectionIndex = -1">
        <slot name="suggestionComponent" v-bind="{suggestion, active: selectionIndex===index}">
          <default-suggestion-component v-bind="{suggestion, active: selectionIndex===index}" />
        </slot>
      </li>
      <slot name="misc-item-below" :suggestions="suggestions" />
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
  suggestionCache: object
  inputElement: HTMLInputElement | null
}

type Suggestion = string | object | number

export default Vue.extend({
  name: 'VueAutocomplete',
  components: {
    DefaultSuggestionComponent,
  },
  directives: {
    /** detect a click outside of the input and the suggestions
     to hide the suggestions */
    clickOutside: {
      isFn: true,
      bind(element: any, binding: any, vnode: VNode) {
        element.event = (event: Event) => {
          const { inputWrapper, suggestions } = vnode.context!.$refs

          // check if the click was outside the components
          if (
            // @ts-ignore
            !inputWrapper.contains(event.target) &&
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
    cacheResults: {
      type: Boolean,
      default: true,
    },
    getSuggestionText: {
      type: Function,
      default(suggestion: any) {
        return JSON.stringify(suggestion)
      },
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
      // if suggestions source is an async function,
      // save the result for each input inside this cache
      suggestionCache: {},
      inputElement: null,
    }
  },
  computed: {
    inputAttributes(): object {
      return {
        ...this.$attrs,
        // @ts-ignore
        value: this.value,
      }
    },
    inputComponent(): Vue | undefined {
      if (this.$slots.default && !!this.$slots.default[0].componentInstance) {
        return this.$slots.default[0].componentInstance
      }
    },
    inputListeners(): object {
      return {
        ...this.$listeners,
        click: (event: Event) => {
          this.handleClick()
          this.$emit('click', event)
        },
        keydown: (event: KeyboardEvent) => {
          const key = event.keyCode
          const selectionUpKeys = [33, 38]
          const selectionDownKeys = [34, 40]
          const selectKeys = [9, 13, 36]
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
  },
  watch: {
    value(newValue) {
      if (newValue === '') {
        this.showSuggestions = false
      }
    },
    // TODO: evaluate if this is necessary or can be done with less code
    async suggestionSource(newSource) {
      this.suggestions = await this.getSuggestions()
    },
  },
  mounted() {
    const inputWrapper = this.$refs.inputWrapper as HTMLDivElement
    this.inputElement = inputWrapper.querySelector('input') as HTMLInputElement
    // @ts-ignore
    this.inputElement.value = this.value
    // @ts-ignore
    this.inputElement.addEventListener('focus', () => {
      this.$emit('focus')
    })
    this.inputElement.addEventListener('input', (event: Event) => {
      const newValue = (event.target as HTMLInputElement).value
      this.$emit('input', newValue)
      this.handleInput(newValue)
    })
  },
  methods: {
    async getSuggestions(): Promise<Suggestion[]> {
      // get the current value, because it will be updated after this function is called
      const currentValue = this.inputElement!.value
      // @ts-ignore
      if (typeof this.suggestionSource === 'function') {
        // @ts-ignore
        if (this.cacheResults) {
          // @ts-ignore
          if (!this.suggestionCache[currentValue]) {
            // @ts-ignore
            const newSuggestions = await this.suggestionSource()
            // @ts-ignore
            this.suggestionCache[currentValue] = newSuggestions
          }
          // @ts-ignore
          return this.suggestionCache[currentValue]
        }
        // @ts-ignore
        return this.suggestionSource()
      }
      // suggestion source is an array
      // @ts-ignore
      return this.suggestionSource
    },
    async handleClick() {
      // @ts-ignore
      if (this.value !== '') {
        this.suggestions = await this.getSuggestions()
        this.showSuggestions = true
      }
    },
    handleKeyDown() {
      // if its at the bottom, move to top
      // if its not at the bottom move down by 1
      // @ts-ignore
      this.showSuggestions = true
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
      this.inputElement!.blur()
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
    async handleInput(newValue: string) {
      this.suggestions = await this.getSuggestions()
      this.showSuggestions = true
      this.selectionIndex = -1
    },
    hideSuggestions() {
      if (this.showSuggestions) {
        this.showSuggestions = false
        this.selectionIndex = -1
      }
    },
    selectSuggestion(suggestion: any) {
      this.hideSuggestions()
      // @ts-ignore
      this.updateInputValue(this.getSuggestionText(suggestion))
      this.$emit('select', suggestion)
      this.inputElement!.blur()
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
.vue-autocomplete {
  position: relative;
}

.vue-autocomplete img {
  position: absolute;
  height: 0.85rem;
  width: 0.85rem;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  padding: 0.2rem;
}

.vue-autocomplete input {
  width: 100%;
  box-sizing: border-box;
}
.vue-autocomplete ul {
  position: absolute;
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;
  width: 100%;
  overflow-y: auto;
  max-height: 300px;
  z-index: 1;
}

.vue-autocomplete li {
  list-style: none;
  cursor: pointer;
  user-select: none;
  background: #ffffff;
}
</style>
