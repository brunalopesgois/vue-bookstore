<template>
  <div id="app">
      <my-header></my-header>

      <my-home></my-home>

      <footer></footer>
  </div>
</template>

<script>
import Header from '../src/components/shared/header/Header.vue';
import Home from '../src/components/home/Home.vue';
export default {
  components: {
    'my-header': Header,
    'my-home': Home
  }
}
</script>

<style>
</style>
