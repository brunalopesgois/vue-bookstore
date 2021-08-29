<template>
  <span class="user-info">
    <h2>{{ name }}</h2>
    <h6>{{ profile }}</h6>
  </span>
</template>

<script>
export default {
  props: ['name', 'profile']
}
</script>

<style>
.user-info {
  position: absolute;
  top: 25px;
  right: 25px;
}
</style>
