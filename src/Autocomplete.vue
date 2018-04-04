<template>
  <section>
    <input type="search" v-bind="$attrs" :value="value" v-on="listeners">
    <!-- make suggestions appear under the input (absolute positioned)-->
    <div style="position:relative">
      <div style="position:absolute">
        <slot name="suggestions"></slot>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'vue-autocomplete',
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: event => this.$emit('input', event.target.value),
      }
    },
  },
}
</script>

