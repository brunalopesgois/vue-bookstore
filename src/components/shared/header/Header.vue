<template>
  <header class="header">
    <b-jumbotron class="d-flex justify-content-center" bg-variant="warning" text-variant="black">
      <template #header>Livraria ABC</template>
    </b-jumbotron>
    <nav>
      <b-navbar class="navbar d-flex justify-content-between" toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#">Home</b-navbar-brand>
        <b-navbar-brand href="#">Entrar</b-navbar-brand>
      </b-navbar>
    </nav>
  </header>
</template>

<script>
import { BJumbotron } from 'bootstrap-vue';
import { BNavbar } from 'bootstrap-vue';
import { BNavbarNav } from 'bootstrap-vue';
import { BNavbarBrand } from 'bootstrap-vue';
export default {
  components: {
    'b-jumbotron': BJumbotron,
    'b-navbar': BNavbar,
    'b-navbar-nav': BNavbarNav,
    'b-navbar-brand': BNavbarBrand
  }
}
</script>

<style>
.navbar {
  width: 100%;
  padding-left: 15px;
}
</style>
