<template>
  <b-container fluid>
    <ul class="book-list">
      <li class="book-list-item" v-for="book of books" :key="book.id">
        <my-panel :content="book"></my-panel>
      </li>
    </ul>
  </b-container>
</template>

<script>
import { BContainer } from 'bootstrap-vue';
import Panel from '../shared/panel/Panel.vue';
export default {
  data() {
    return {
      books: [],
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
.book-list {
  list-style: none;
}
.book-list .book-list-item {
  display: inline-block;
}
</style>
