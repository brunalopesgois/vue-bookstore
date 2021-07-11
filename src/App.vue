<template>
  <div id="app">
      <header>
        <b-jumbotron bg-variant="warning" text-variant="black">
          <template #header>Livraria ABC</template>

        <nav>
          <b-navbar class="d-flex justify-content-between" toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="#">Home</b-navbar-brand>
            <b-navbar-nav class="ml-auto">
              <b-nav-item href="#">Log In</b-nav-item>
            </b-navbar-nav>
          </b-navbar>
        </nav>
        </b-jumbotron>
      </header>

      <section>
        <ul class="book-list">
          <li>
            <div class="panel">
              <img class="img" src="https://img.r7.com/images/dia-internacional-do-gato-instagram-08082019161529430?dimensions=771x420&no_crop=true" alt="">
              <h3>R$ 23.56</h3>
              <p>Gato astrounauta</p>
              <b-button variant="warning">Comprar</b-button>
            </div>
          </li>
        </ul>
      </section>

      <footer></footer>
  </div>
</template>

<script>
import { BContainer } from 'bootstrap-vue';
import { BJumbotron } from 'bootstrap-vue';
import { BNavbar } from 'bootstrap-vue';
import { BNavbarNav } from 'bootstrap-vue';
import { BNavbarBrand } from 'bootstrap-vue';
import { BButton } from 'bootstrap-vue';
export default {
  components: {
    'b-container': BContainer,
    'b-jumbotron': BJumbotron,
    'b-navbar': BNavbar,
    'b-navbar-nav': BNavbarNav,
    'b-navbar-brand': BNavbarBrand,
    'b-button': BButton
  }
}
</script>

<style>
.book-list {
  list-style: none;
}
.panel {
  padding: 10px;
  border: solid 2px black;
  display: inline-block;
  margin: 5px;
  width: 240px;
  height: 100%;
  vertical-align: top;
  text-align: center;
}
.img {
  width: 100%;
}
</style>
