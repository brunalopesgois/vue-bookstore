<template>
  <div id="app">
    <my-header></my-header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '../src/components/shared/header/Header.vue';
export default {
  components: {
    'my-header': Header
  }
}
</script>

<style>
</style>
