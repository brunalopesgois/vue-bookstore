<template>
  <header class="header">
    <b-jumbotron class="d-flex justify-content-center" bg-variant="warning" text-variant="black">
      <template #header>Livraria ABC</template>
    </b-jumbotron>
    <my-navbar></my-navbar>
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
.header {
  margin-bottom: 40px;
}
</style>
