<template>
  <b-container fluid>
    <div class="top-section">
      <div class="admin-register-btn">
        <b-button variant="primary" :to="{ name: 'register' }">
          + Novo Livro
        </b-button>
      </div>
      <div class="searchbox d-flex justify-content-end">
        <b-form-input type="search" v-model="filter" class="searchbox-input" placeholder="Buscar"></b-form-input>
        <img class="searchbox-img" src="/src/assets/search-icon.png">
      </div>
    </div>
    <div v-if="indexError" class="error-occurred">
      <p class="error-message text-center">Ops... ocorreu um erro.</p>
      <img class="error-img d-flex justify-content-center" src="/src/assets/error.png" alt="">
    </div>
    <b-alert
      :show="dismissFailCountDown"
      fade
      variant="danger"
    >
      Ops... não foi possível remover o registro!
    </b-alert>
    <section class="section">
      <ul class="book-list">
        <li class="book-list-item" v-for="book of filteredBooks" :key="book.id">
          <my-panel @remove="remove" :content="book"></my-panel>
        </li>
      </ul>
    </section>
  </b-container>
</template>

<script>
import { BContainer } from 'bootstrap-vue';
import Panel from '../shared/panel/Panel.vue';
import axios from 'axios';
import { BAlert } from 'bootstrap-vue';
export default {
  data() {
    return {
      books: [],
      filter: '',
      indexError: false,
      dismissSecs: 5,
      dismissFailCountDown: 0
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
  methods: {
    remove(book) {
        axios.delete(`http://localhost:8000/api/books/${book.id}`)
          .then(res => {
            alert('Livro removido com sucesso');
            let index = this.books.indexOf(book);
            this.books.splice(index, 1);
          })
          .catch(e => {
            this.serverError = 'delete';
            this.showFailAlert();
            console.log(e);
          });
    },
    showFailAlert() {
      this.dismissFailCountDown = this.dismissSecs
    }
  },
  created() {

    const axios = require('axios');

    axios.get('http://localhost:8000/api/books')
      .then(res => this.books = res.data.data)
      .catch(e => {
        this.indexError = true;
        console.log(e);
      });
  },
  components: {
    'b-container': BContainer,
    'my-panel': Panel
  }
}
</script>

<style>
.error-message {
  color: dimgray;
}
.error-img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 300px;
  height: 300px;
}
.top-section {
  display: flex;
}
.section {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.admin-register-btn {
  width: 100%;
  padding-left: 40px;
}
.searchbox {
  width: 100%;
  padding-bottom: 20px;
  padding-right: 40px;
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
  margin-left: 4%;
}
.book-list .book-list-item {
  display: inline-block;
}
</style>
