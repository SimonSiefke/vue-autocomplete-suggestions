<template>
  <section v-click-outside="hideSuggestions" class="vue-autocomplete">
    <div ref="inputWrapper" v-bind="inputAttributes" v-on="inputListeners">
      <slot>
        <default-search-field />
      </slot>
    </div>

    <ul v-show="showSuggestions" ref="suggestions" class="suggestions">
      <div class="misc-item-above">
        <slot :suggestions="suggestions" name="misc-item-above" />
      </div>
      <li v-for="(suggestion, index) in suggestions" :key="getSuggestionText(suggestion)" @click="selectSuggestion(suggestion)" @mouseover="selectionIndex = index" :class="{'is-hovered': selectionIndex===index}" @mouseleave="selectionIndex = -1" class="search-suggestion">
        <slot v-bind="{suggestion, active: selectionIndex===index}" name="suggestionComponent">
          <default-suggestion-component v-bind="{suggestion, active: selectionIndex===index}" />
        </slot>
      </li>
      <div class="misc-item-below">
        <slot :suggestions="suggestions" name="misc-item-below" class="misc-item-below" />
      </div>
    </ul>
  </section>
</template>

<script lang="ts">
import Vue, { VNode } from 'vue'
import DefaultSuggestionComponent from './DefaultSuggestionComponent.vue'
import DefaultSearchField from './DefaultSearchField.vue'
import { Prop } from 'vue/types/options'

interface Data {
  selectionIndex: number
  showSuggestions: boolean
  suggestions: any[]
  suggestionCache: Cache
  inputElement: HTMLInputElement | null
  isMakingRequest: boolean
}

type Suggestion = string | object | number
interface Cache {
  [key: string]: any
}
export default Vue.extend({
  name: 'VueAutocomplete',
  components: {
    DefaultSuggestionComponent,
    DefaultSearchField,
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
            // console.log('outside')

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
        if (typeof suggestion === 'string') {
          return suggestion
        }
        return JSON.stringify(suggestion)
      },
    },
    suggestionSource: {
      type: [Array, Function],
      required: true,
    },
    value: {
      type: [String, Number],
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
      isMakingRequest: false,
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
      const nativeListeners = {
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
      // @ts-ignore
      delete nativeListeners.select
      return nativeListeners
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue) {
        if (this.inputElement) {
          console.log('input value changed to', newValue)

          // @ts-ignore
          this.inputElement.value = this.value
        }

        if (newValue === '') {
          this.showSuggestions = false
        }
      },
    },
    // TODO: evaluate if this is necessary or can be done with less code
    suggestionSource: {
      async handler(newSource) {
        this.clearCache()
        console.log('new suggestion source')

        // @ts-ignore
        try{
        this.suggestions = await this.getSuggestions()
        }catch(error){
          console.error(error)
        }
      },
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
      event.preventDefault()
      event.stopPropagation()
      const newValue = (event.target as HTMLInputElement).value
      // @ts-ignore
      if (this.value !== newValue) {
        this.$emit('input', newValue)
        this.handleInput(newValue)
      }
    })
  },
  methods: {
    clearCache() {
      this.suggestionCache = {}
    },
    async getSuggestions(): Promise<Suggestion[]> {
      // @ts-ignore
      if (Array.isArray(this.suggestionSource)) {
        // @ts-ignore
        return this.suggestionSource
      }

      // @ts-ignore
      if (typeof this.suggestionSource === 'function') {
        // @ts-ignore
        if (this.cacheResults) {
          const inputValue = this.inputElement!.value
          if (this.suggestionCache[inputValue]) {
            return this.suggestionCache[inputValue]
          }
          this.isMakingRequest = true
          let newSuggestions
          try {
          // @ts-ignore
          newSuggestions = await this.suggestionSource()
          } catch (error) {
            console.error(error)
          }
          this.isMakingRequest = false
          this.suggestionCache[inputValue] = newSuggestions
          return newSuggestions
          // }
          // const currentValue = this.inputElement!.value
          // const result = (this.suggestionCache as any)[currentValue]
          // return result
        } else {
          this.isMakingRequest = true
          let result
          try {
          // @ts-ignore
          result = await this.suggestionSource()
          } catch (error) {
            console.error(error)
          }
          this.isMakingRequest = false
          return result
        }
      }

      throw new Error('invalid suggestion source')
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
      // console.log('eneter')

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
      console.log('handle input')

      try {
      this.suggestions = await this.getSuggestions()
      } catch (error) {
        console.error=error
      }
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
      this.$emit('input', this.getSuggestionText(suggestion))
      this.$emit('select', suggestion)
      // @ts-ignore
      this.inputElement.value = this.getSuggestionText(suggestion)
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
.vue-autocomplete .suggestions {
  position: absolute;
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;
  width: 100%;
  z-index: 1;
  box-sizing: border-box;
}

.vue-autocomplete .search-suggestion {
  list-style: none;
  cursor: pointer;
  user-select: none;
  background: #ffffff;
}
.vue-autocomplete .search-suggestion.is-hovered {
  background: rgba(0, 0, 0, 0.09);
}

.vue-autocomplete > ul {
  border-left: 1px solid #bbb;
  border-right: 1px solid #bbb;
  border-bottom: 1px solid #bbb;
}
</style>
