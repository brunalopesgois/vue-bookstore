<template>
  <header>
    <div class="header d-flex justify-content-center m-4">
      <img src="/src/assets/logov2.png" alt="">
    </div>
    <my-navbar class="mb-4"></my-navbar>
  </header>
</template>

<script>
import { BJumbotron } from 'bootstrap-vue';
import Navbar from '../navbar/Navbar.vue';
export default {
  components: {
    'b-jumbotron': BJumbotron,
    'my-navbar': Navbar
  }
}
</script>

<style>
</style>
