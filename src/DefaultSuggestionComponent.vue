<template>
  <span>{{ suggestion }}</span>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    suggestion: {
      type: [Object, Number, String],
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
})
</script>
