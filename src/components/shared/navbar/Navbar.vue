<template>
  <nav class="navigation">
    <b-row>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-col>
          <b-navbar-brand id="nav-item" :to="{ name: 'home' }">Home</b-navbar-brand>
        </b-col>
        <b-col class="d-flex justify-content-end">
          <b-navbar-nav>
            <b-nav-item id="nav-item" :to="{ name: 'login' }">Entrar</b-nav-item>
            <b-nav-item id="nav-item" @click.prevent="logout()" :to="{ name: 'login' }">Sair</b-nav-item>
          </b-navbar-nav>
        </b-col>
      </b-navbar>
    </b-row>
  </nav>
</template>

<script>
import { BNavbar } from 'bootstrap-vue';
import { BNavbarNav } from 'bootstrap-vue';
import { BNavbarBrand } from 'bootstrap-vue';
import { BNavItem } from 'bootstrap-vue';
import { BRow } from 'bootstrap-vue';
import { BCol } from 'bootstrap-vue';
export default {
  components: {
    'b-navbar': BNavbar,
    'b-navbar-nav': BNavbarNav,
    'b-navbar-brand': BNavbarBrand,
    'b-row': BRow,
    'b-col': BCol,
    'b-nav-item': BNavItem
  },
  methods: {
    logout() {
      localStorage.clear();
    }
  }
}
</script>

<style>
.navigation {
  max-width: 100%;
  overflow-x: hidden;
}
#nav-item {
  padding-left: 15px;
  padding-right: 15px;
}
</style>
