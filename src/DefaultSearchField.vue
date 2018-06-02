<template>
  <div class="default-search-field" :class="size">
    <input v-bind="inputAttributes">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  inheritAttrs: false,
  props: {
    size: {
      default: 'large',
      type: String,
    },
  },
  computed: {
    inputAttributes(): object {
      return {
        type: 'text',
        autocomplete: 'off',
        ...this.$attrs,
      }
    },
  },
})
</script>


<style>
.default-search-field {
  border: 1px solid #bdbdbd;
  display: flex;
}
.default-search-field > input {
  border: 0;
  outline: 0;
}

.default-search-field.large {
  height: 35px;
}
.default-search-field.large > input {
  line-height: 15px;
  font-size: 15px;
  padding: 6px 10px 6px 0;
  text-indent: 8px;
}

.default-search-field.medium {
  height: 25px;
}
.default-search-field.medium > input {
  line-height: 13px;
  font-size: 13px;
  padding: 4px 7px 4px 0;
  text-indent: 5px;
}

.default-search-field.small {
  height: 20px;
}
.default-search-field.small > input {
  line-height: 11px;
  font-size: 11px;
  text-indent: 3px;
}
</style>
