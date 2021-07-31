<template>
  <div class="panel">
    <div class="panel-admin-buttons">
      <b-button-group size="sm">
        <b-button variant="info" :to="{ name: 'update', params: { id: content.id } }">
          <img src="/src/assets/edit-icon.png">
        </b-button>
        <b-button variant="danger" @click="deleteBook(content)">
          <img src="/src/assets/exit-icon.png">
        </b-button>
      </b-button-group>
    </div>
    <div class="panel-content">
      <img class="img" v-if="content.cover" :src="'http://localhost:8000/'+content.cover">
      <img class="img" v-else src="/src/assets/no-image.png">
      <h3>R$ {{ content.sale_price }}</h3>
      <p>{{ content.title }}</p>
      <div class="btn-alignment">
        <b-button variant="warning">Saiba Mais</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { BButton } from 'bootstrap-vue';
import { BButtonGroup } from 'bootstrap-vue';
import { VBModal } from 'bootstrap-vue';
export default {
  data() {
    return {
      confirm: ''
    }
  },
  props: ['content'],
  components: {
    'b-button': BButton,
    'b-button-group': BButtonGroup,
    'b-modal': VBModal
  },
  methods: {
    deleteBook(book) {
      this.showModal(book);
    },
    showModal(book) {
      this.$bvModal.msgBoxConfirm(`Deseja realmente remover o livro ${book.title}?`, {
        title: 'Atenção',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'Sim',
        cancelTitle: 'Não',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
        .then(value => {
          if (value) {
            this.$emit('remove', book);
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
}
</script>

<style>
.panel {
  position: relative;
  padding: 10px;
  border: solid 2px black;
  display: inline-block;
  margin-top: 15px;
  margin-left: 15px;
  margin-bottom: 15px;
  width: 260px;
  height: 100%;
  min-height: 500px;
  max-height: 500px;
  vertical-align: top;
  background-color: white;
}
.panel-admin-buttons {
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
