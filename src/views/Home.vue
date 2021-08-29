<template>
  <div class="content">
    <my-user :name="user.name" :profile="user.profile"></my-user>
    <b-container fluid>
      <div class="top-section">
        <div v-if="user.profile == 'Admin'" class="admin-register-btn">
          <b-button variant="primary" :to="{ name: 'register' }">
            + Novo Livro
          </b-button>
        </div>
        <div class="searchbox d-flex justify-content-end">
          <b-form-input type="search" v-model="filter" class="searchbox-input" placeholder="Buscar" @input="handleFilter()"></b-form-input>
          <img class="searchbox-img" src="/src/assets/search-icon.png">
        </div>
      </div>
      <div v-if="indexError" class="error-occurred">
        <p class="error-message text-center">Ops... ocorreu um erro.</p>
        <img class="error-img d-flex justify-content-center" src="/src/assets/error.png" alt="">
      </div>
      <my-alert :show="show" :variant="variant">{{ message }}</my-alert>
      <section class="section">
        <ul class="book-list">
          <li class="book-list-item" v-for="book of books" :key="book.id">
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
import Panel from '../components/Panel.vue';
import { BPagination } from 'bootstrap-vue';
import UserInfo from '../components/UserInfo.vue';
import BookService from '../services/book/BookService';
import Alert from '../components/Alert.vue';
export default {
  data() {
    return {
      books: [],
      filter: '',
      indexError: false,
      currentPage: 1,
      rows: 0,
      perPage: 0,
      debounce: null,
      user: {
        name: localStorage.getItem('userName') ? localStorage.getItem('userName') : '',
        profile: localStorage.getItem('userProfile') ? localStorage.getItem('userProfile') : ''
      },
      show: 0,
      variant: 'primary',
      message: ''
    }
  },
  components: {
    'b-container': BContainer,
    'my-panel': Panel,
    'b-pagination': BPagination,
    'my-user': UserInfo,
    'my-alert': Alert
  },
  methods: {
    remove(book) {
        this.service.delete(book.id)
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
      this.variant = "success",
      this.message = "Livro inserido com sucesso!"
      this.show = 3;
    },
    showFailAlert() {
      this.variant = "danger",
      this.message = "Ops... Ocorreu um erro!"
      this.show = 3;
    },
    index() {
      this.service.list(this.currentPage)
        .then(res => {
          this.books = res.data.data;
          this.rows = res.data.last_page * 11;
          this.perPage = res.data.per_page;
        })
        .catch(e => {
          this.indexError = true;
          console.log(e);
        });
    },
    handleFilter() {
      if (!this.filter) {
        this.index();
        return false;
      }
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.service.filter(this.filter)
          .then(res => {
            this.books = res.data;
          });
      }, 500);
    }
  },
  created() {
    this.service = new BookService();
    this.index();
  },
  watch: {
    currentPage: {
      handler: function(value) {
        this.service.list(this.currentPage)
          .then(res => {
            this.books = res.data.data
            this.rows = res.data.last_page * 11;
            this.perPage = res.data.per_page;
          })
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
