<template>
  <span :style="{'background':active ? 'rgba(0,0,0,0.1)':'white'}">{{suggestion}}</span>
</template>

<script>
export default {
  props: {
    suggestion: {},
    active: {
      type: Boolean,
    },
  },
}
</script>
