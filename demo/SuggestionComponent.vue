<template functional>
  <span :class="{'active': props.active}">{{ props.suggestion.name }}</span>
</template>

<style>
span {
  display: block;
  /* padding: 0.2rem; */
}

.active {
  background: #007fff;
  color: #ffffff;
  border: 1px solid #003eff;
  margin: -1px;
}
</style>
