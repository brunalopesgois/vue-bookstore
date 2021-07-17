<template>
  <b-container fluid>
    <div class="searchbox d-flex justify-content-end">
      <b-form-input v-model="filter" class="searchbox-input" placeholder="Buscar"></b-form-input>
      <img class="searchbox-img" src="/src/assets/search-icon.png">
    </div>
    <section class="section">
      <ul class="book-list">
        <li class="book-list-item" v-for="book of filteredBooks" :key="book.id">
          <my-panel :content="book"></my-panel>
        </li>
      </ul>
    </section>
  </b-container>
</template>

<script>
import { BContainer } from 'bootstrap-vue';
import Panel from '../shared/panel/Panel.vue';
export default {
  data() {
    return {
      books: [],
      filter: ''
    }
  },
  computed: {
    filteredBooks() {
      if (this.filter) {
        return this.books.filter((book) => {
          return book.title.match(new RegExp(this.filter, "i"));
        });
      };

      return this.books;
    }
  },
  created() {
    const axios = require('axios');

    axios.get('http://localhost:8000/api/books')
      .then(res => this.books = res.data.data);
  },
  components: {
    'b-container': BContainer,
    'my-panel': Panel
  }
}
</script>

<style>
.section {
  width: 95%;
}
.searchbox {
  width: 100%;
  padding: 40px;
}
.searchbox .searchbox-input {
  width: 260px;
}
.searchbox-img {
  max-width: 100%;
  height: auto;
  padding-left: 5px;
}
.book-list {
  list-style: none;
  margin-left: 65px;
}
.book-list .book-list-item {
  display: inline-block;
}
</style>
