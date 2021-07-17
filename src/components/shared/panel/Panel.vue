<template>
  <div class="panel">
    <div class="panel-admin-buttons">
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
export default {
  props: ['content'],
  components: {
    'b-button': BButton,
    'b-button-group': BButtonGroup
  }
}
</script>

<style>
.panel {
  position: relative;
  padding: 10px;
  border: solid 2px black;
  display: inline-block;
  margin-left: 15px;
  margin-bottom: 15px;
  width: 260px;
  height: 100%;
  min-height: 500px;
  max-height: 500px;
  vertical-align: top;
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
