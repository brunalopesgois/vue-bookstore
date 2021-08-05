<template>
  <div class="content">
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
        class="position-fixed fixed-top m-0 rounded-0"
        style="z-index: 2000;"
        fade
        variant="danger"
      >
        Ops... não foi possível remover o registro!
      </b-alert>
      <b-alert
        :show="dismissSuccessCountDown"
        class="position-fixed fixed-top m-0 rounded-0"
        style="z-index: 2000;"
        fade
        variant="success"
      >
        Livro removido com sucesso!
      </b-alert>
      <section class="section">
        <ul class="book-list">
          <li class="book-list-item" v-for="book of filteredBooks" :key="book.id">
            <my-panel @remove="remove" :content="book"></my-panel>
          </li>
        </ul>
      </section>
      <div class="mt-3">
        <b-pagination v-model="currentPage" pills :total-rows="rows" :per-page="perPage" align="right"></b-pagination>
      </div>
    </b-container>
  </div>
</template>

<script>
import { BContainer } from 'bootstrap-vue';
import Panel from '../shared/panel/Panel.vue';
import axios from 'axios';
import { BPagination } from 'bootstrap-vue';
export default {
  data() {
    return {
      books: [],
      filter: '',
      indexError: false,
      dismissSecs: 5,
      dismissSuccessCountDown: 0,
      dismissFailCountDown: 0,
      currentPage: 1,
      rows: 0,
      perPage: 0
    }
  },
  components: {
    'b-container': BContainer,
    'my-panel': Panel,
    'b-pagination': BPagination
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
            this.showSuccessAlert();
            let index = this.books.indexOf(book);
            this.books.splice(index, 1);
          })
          .catch(e => {
            this.serverError = 'delete';
            this.showFailAlert();
            console.log(e);
          });
    },
    showSuccessAlert() {
      this.dismissSuccessCountDown = this.dismissSecs
    },
    showFailAlert() {
      this.dismissFailCountDown = this.dismissSecs
    }
  },
  created() {

    const axios = require('axios');

    axios.get(`http://localhost:8000/api/books?page=${this.currentPage}`)
      .then(res => {
        this.books = res.data.data;
        this.rows = res.data.last_page + 2;
        this.perPage = res.data.per_page;
      })
      .catch(e => {
        this.indexError = true;
        console.log(e);
      });
  },
  watch: {
    currentPage: {
      handler: function(value) {
        axios.get(`http://localhost:8000/api/books?page=${this.currentPage}`)
          .then(res => this.books = res.data.data)
          .catch(e => {
            this.indexError = true;
            console.log(e);
          });
      }
    }
  }
}
</script>

<style>
.content {
  flex: 1 100vh;
}
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
.page-item.active .page-link {
    background-color: #faad14 !important;
    border-color: #faad14 !important;
}
.page-item .page-link {
    color: black !important;
}
</style>
