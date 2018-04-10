<template functional>
  <span>{{ JSON.stringify(props.suggestion) }} {{ props.active }}</span>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    suggestion: {
      required: true,
      type: [Number, Object, Array, String],
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
})
</script>
