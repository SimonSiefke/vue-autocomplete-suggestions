<template>
  <section>
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
    <input type="text" :value="value" v-bind="$attrs" v-on="listeners">

    <ul class="vue-autocomplete-suggestions">
      <template v-for="suggestion in suggestions">
        <li :key="getLabel(suggestion)" @click="selectSuggestion(suggestion)">
          <!-- some explanations for the slot:
          4. 'slot name="suggestionComponent"': the suggestion component
            provided by the user will be rendered, e.g.
            <vue-autocomplete>
              <my-component slot="suggestionComponent">
                I am text inside the suggestion component
              </my-component>
            </vue-autocomplete>

          5. 'v-bind="suggestion"': pass the suggestion as a prop
              to the component provided by the user so that the user
              can access it with slot-scope, e.g.
              <vue-autocomplete :suggestions="['a','b','c']">
                <my-component slot="suggestionComponent" slot-scope="myProp">
                  {{myProp}} (myProp will be the suggestion: 'a','b' or 'c')
                </my-component>
              </vue-autocomplete>
          -->
          <slot name="suggestionComponent" v-bind="suggestion">
            <!-- use the suggestion as a fallback when
                 there is no component provided by the user
            -->
            {{suggestion}}
          </slot>
        </li>
      </template>
    </ul>
  </section>
</template>

<script>
export default {
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
    /**
      this function returns the value that will be the value
      of the input element when the suggestionComponent is clicked.
      because it is unique, its return value is also used as a key
      for the suggestion (see <li :key="getLabel(suggestion)">)
    */
    getLabel: {
      type: Function,
      default: suggestion => JSON.stringify(suggestion),
    },
  },
  computed: {
    // for explanantion see 3.
    listeners() {
      return {
        ...this.$listeners,
        input: event => this.$emit('input', event.target.value),
      }
    },
  },
  methods: {
    selectSuggestion(suggestion) {
      const value = this.getLabel(suggestion)
      this.$emit('input', value)
    },
  },
}
</script>

<style>
/* make suggestions appear under the input (absolute positioned)
   and remove spacing */

ul.vue-autocomplete-suggestions {
  position: absolute;
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;
}

ul.vue-autocomplete-suggestions li {
  list-style: none;
}
</style>
