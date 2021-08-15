<template>
  <div class="content">
    <my-user :name="user.name" :profile="user.profile"></my-user>
    <b-container fluid>
      <my-section>
        <b-row>
          <b-col>
            <div class="img-panel">
              <img class="img" v-if="this.book.cover" :src="this.storageUrl+this.book.cover">
              <img class="img" v-else src="/src/assets/no-image.png">
            </div>
          </b-col>
          <b-col>
              <h2>{{ this.book.title }}</h2>
              <h3 class="genre">{{ this.book.genre }}</h3>
              <h1 class="price">
                <div class="flex-price d-flex justify-content-start">
                  R$
                  <div class="formated-price">{{ this.book.price }}</div>
                </div>
              </h1>
              <span v-if="!readMoreActivated">{{ this.book.desc.slice(0, 400) }}</span>
              <a class="" v-if="(!readMoreActivated) && (this.book.desc.length > 400)" @click="activateReadMore" href="#">
                Leia mais...
              </a>
              <span v-if="readMoreActivated">{{ this.book.desc }}</span>
              <a class="" v-if="readMoreActivated" @click="activateReadLess" href="#">
                Leia menos...
              </a>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="d-flex justify-content-end">
            <b-button variant="warning" size="lg" :to="{ name: 'checkout', params: { id: this.id } }">Comprar</b-button>
          </b-col>
        </b-row>
      </my-section>
    </b-container>
  </div>
</template>

<script>
import { BContainer } from 'bootstrap-vue';
import { BRow } from 'bootstrap-vue';
import { BCol } from 'bootstrap-vue';
import { BButton } from 'bootstrap-vue'
import Section from '../shared/section/Section.vue';
import UserInfo from '../shared/user-info/UserInfo.vue';
export default {
  components: {
    'b-container': BContainer,
    'b-row': BRow,
    'b-col': BCol,
    'b-button': BButton,
    'my-section': Section,
    'my-user': UserInfo
  },
  data() {
    return {
      id: this.$route.params.id,
      book: {
        title: '',
        genre: '',
        desc: '',
        price: '',
        cover: null
      },
      readMoreActivated: false,
      user: {
        name: localStorage.getItem('userName') ? localStorage.getItem('userName') : '',
        profile: localStorage.getItem('userProfile') ? localStorage.getItem('userProfile') : ''
      },
      storageUrl: process.env.API_URL + '/'
    }
  },
  methods: {
    activateReadMore(event){
        event.preventDefault();
        this.readMoreActivated = true;
    },
    activateReadLess(event){
      event.preventDefault();
      this.readMoreActivated = false;
    }
  },
  created() {
    const axios = require('axios');

    axios.get(`/api/books/${this.id}`)
      .then(res => {
        this.book.title = res.data.title,
        this.book.genre = res.data.genre,
        this.book.desc = res.data.description,
        this.book.price = res.data.sale_price,
        this.book.cover = res.data.cover
      })
      .catch(e => {
        console.log(e);
      });
  }
}
</script>

<style>
.content {
  flex: 1 100vh;
}
  .img-panel {
    width: 350px;
    height: 500px;
    border-style: solid;
  }
  .img {
    min-width: 100%;
    min-height: 100%;
    max-width: 100%;
    max-height: 100%;
  }
  .genre {
    padding-bottom: 10%;
    color: gray;
  }
  .price {
    padding-bottom: 10%;
  }
  .formated-price {
    color: orange;
  }
</style>
