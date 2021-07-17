<template>
  <b-container fluid>
    <div class="register-section">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group
          id="input-group-1"
          label="Título:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.title"
            type="text"
            placeholder="O livro mais legal do mundo..."
            required
          ></b-form-input>
        </b-form-group>
        <br>
        <b-form-group
          id="input-group-3"
          label="Gênero:"
          label-for="input-2"
        >
          <b-form-input
            id="input-3"
            v-model="form.genre"
            type="text"
            placeholder="Aventura..."
            required
          ></b-form-input>
        </b-form-group>
        <br>
        <b-form-group
          id="input-group-4"
          label="Descrição:"
          label-for="textarea-1"
        >
        <b-form-textarea
          id="textarea-1"
          v-model="form.desc"
          placeholder="Era uma vez..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
        </b-form-group>
        <br>
        <b-form-group
          id="input-group-2"
          label="Preço de venda:"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            v-model="form.price"
            type="number"
            placeholder="Apenas números..."
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-5"
          label-for="file-1"
        >
          <div class="mt-3">Selecione um arquivo: {{ form.file ? file.name : '' }}</div>
          <b-form-file id="file-1" v-model="form.file" class="mt-3" plain></b-form-file>
        </b-form-group>
        <div class="form-btn">
          <b-button type="submit" variant="primary">Cadastrar</b-button>
          <b-button type="reset" variant="danger">Limpar</b-button>
        </div>
      </b-form>
    </div>
  </b-container>
</template>

<script>
import { BContainer } from 'bootstrap-vue';
import { BForm } from 'bootstrap-vue';
import { BFormGroup } from 'bootstrap-vue';
import { BFormInput } from 'bootstrap-vue';
import { BFormFile } from 'bootstrap-vue';
import { BFormTextarea } from 'bootstrap-vue';
export default {
  components: {
    'b-container': BContainer,
    'b-form': BForm,
    'b-form-group': BFormGroup,
    'b-form-input': BFormInput,
    'b-form-file': BFormFile,
    'b-form-textarea': BFormTextarea
  },
  data() {
    return {
      form: {
        title: '',
        genre: '',
        desc: '',
        price: '',
        file: null
      }
    }
  },
  methods: {
    onSubmit(event) {
      //
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.title = '';
      this.form.genre = '';
      this.form.desc = '';
      this.form.price = '';
      this.form.file = null;
    }
  }
}
</script>

<style>
.register-section {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  padding: 50px;
  background-color: #E9E9E9;
}
.form-btn {
  margin-top: 20px;
}
</style>
