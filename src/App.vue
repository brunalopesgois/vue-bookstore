<template>
  <div id="app">
      <header>
        <b-jumbotron bg-variant="warning" text-variant="black">
          <template #header>Livraria ABC</template>

        <nav>
          <b-navbar class="d-flex justify-content-between" toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="#">Home</b-navbar-brand>
            <b-navbar-brand href="#">Entrar</b-navbar-brand>
          </b-navbar>
        </nav>
        </b-jumbotron>
      </header>

      <section>
        <ul class="book-list">
          <li v-for="book of books" :key="book.id">
            <div class="panel">
              <img class="img" :src="'http://localhost:8000/'+book.cover">
              <h3>R$ {{ book.sale_price }}</h3>
              <p>{{ book.title }}</p>
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
  data() {
    return {
      books: [],
    }
  },
  created() {
    const axios = require('axios');

    axios.get('http://localhost:8000/api/books?')
      .then(res => this.books = res.data);
  },
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
