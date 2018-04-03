<template>
  <section>
    <input type="text" v-bind="$attrs" :value="value" v-on="listeners">
    <div>
      <div>
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

<style scoped>
/* make suggestions appear under the input (absolute positioned) */
div {
  position: relative;
}

div div {
  position: absolute;
}
</style>
