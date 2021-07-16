<template>
  <b-container fluid>
    <ul class="book-list">
      <li class="book-list-item" v-for="book of books" :key="book.id">
        <div class="panel">
          <div class="panel-admin">
            <b-button-group size="sm">
              <b-button variant="info">
                <img src="/src/assets/edit-icon.png">
              </b-button>
              <b-button variant="danger">
                <img src="/src/assets/exit-icon.png">
              </b-button>
            </b-button-group>
          </div>
          <div class="panel-content">
            <img class="img" v-if="book.cover" :src="'http://localhost:8000/'+book.cover">
            <img class="img" v-else src="/src/assets/no-image.png">
            <h3>R$ {{ book.sale_price }}</h3>
            <p>{{ book.title }}</p>
            <div class="btn-alignment">
              <b-button variant="warning">Comprar</b-button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </b-container>
</template>

<script>
import { BContainer } from 'bootstrap-vue';
import { BButton } from 'bootstrap-vue';
import { BButtonGroup } from 'bootstrap-vue';
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
    'b-button': BButton,
    'b-button-group': BButtonGroup
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
.panel {
  position: relative;
  padding: 10px;
  border: solid 2px black;
  display: inline-block;
  margin: 15px;
  width: 260px;
  height: 100%;
  min-height: 500px;
  max-height: 500px;
  vertical-align: top;
}
.panel-admin {
  text-align: end;
}
.panel-content {
  text-align: center;
}
.img {
  width: 100%;
  height: 300px;
}
.btn-alignment {
  position: absolute;
  bottom: 15px;
  left: 83px;
}
</style>
