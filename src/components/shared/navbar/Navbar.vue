<template>
  <nav>
    <b-navbar class="navbar d-flex justify-content-between" toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand :to="{ name: 'home' }">Home</b-navbar-brand>
      <b-navbar-brand :to="{ name: 'login' }">Entrar</b-navbar-brand>
    </b-navbar>
  </nav>
</template>

<script>
import { BNavbar } from 'bootstrap-vue';
import { BNavbarNav } from 'bootstrap-vue';
import { BNavbarBrand } from 'bootstrap-vue';
export default {
  components: {
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
