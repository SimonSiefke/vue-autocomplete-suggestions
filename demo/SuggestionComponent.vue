<template functional>
  <span :class="{'active': props.active}">{{ props.suggestion.name }}</span>
</template>

<style>
span {
  display: block;
  padding: 0.2rem;
  transition: all 0.04s;
}

.active {
  background: #007fff;
  color: #ffffff;
}
</style>
