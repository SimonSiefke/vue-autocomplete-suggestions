<template functional>
  <span :style="{'background': props.active ? 'rgba(0,0,0,0.1)':'white'}">{{props.suggestion.name}}</span>
</template>

<style>
span {
  display: block;
}
</style>
