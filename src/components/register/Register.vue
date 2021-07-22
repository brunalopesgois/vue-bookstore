<template>
  <b-container fluid>
    <my-section>
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
          required
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
            step="0.01"
            min="0"
            max="99"
            placeholder="Apenas números..."
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-5"
          label-for="file-1"
        >
          <div class="mt-3">Selecione um arquivo: {{ form.file ? form.file.name : '' }}</div>
          <b-form-file id="file-1" ref="file" v-model="form.file" class="mt-3" plain></b-form-file>
        </b-form-group>
        <div class="form-btn">
          <b-button type="submit" variant="primary">Cadastrar</b-button>
          <b-button type="reset" variant="danger">Limpar</b-button>
        </div>
      </b-form>
    </my-section>
  </b-container>
</template>

<script>
import { BContainer } from 'bootstrap-vue';
import { BForm } from 'bootstrap-vue';
import { BFormGroup } from 'bootstrap-vue';
import { BFormInput } from 'bootstrap-vue';
import { BFormFile } from 'bootstrap-vue';
import { BFormTextarea } from 'bootstrap-vue';
import axios from 'axios';
import Section from '../shared/section/Section.vue';
export default {
  components: {
    'b-container': BContainer,
    'b-form': BForm,
    'b-form-group': BFormGroup,
    'b-form-input': BFormInput,
    'b-form-file': BFormFile,
    'b-form-textarea': BFormTextarea,
    'my-section': Section
  },
  data() {
    return {
      form: {
        title: '',
        genre: '',
        desc: '',
        price: '',
        file: null
      },
      id: this.$route.params.id
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      let formData = new FormData();
      formData.append('title', this.form.title);
      formData.append('image', this.form.file);
      formData.append('genre', this.form.genre);
      formData.append('description', this.form.desc);
      formData.append('sale_price', this.form.price);

      this.createOrUpdate(formData, this.id);
    },
    createOrUpdate(formData, id) {
      let response = '';
      if (id) {
        formData.append('_method', 'PUT');
        axios.post(`http://localhost:8000/api/books/${this.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => {
          console.log(res.data);
        })
        .catch(e => {
          console.log(e.response.data);
        });

        return;
      }

      axios.post('http://localhost:8000/api/books', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.title = '';
      this.form.genre = '';
      this.form.desc = '';
      this.form.price = '';
      this.$refs['file'].reset();
    }
  },
  created() {
    if (this.id) {
      axios.get(`http://localhost:8000/api/books/${this.id}`)
      .then(res => {
        this.form.title = res.data.title,
        this.form.genre = res.data.genre,
        this.form.desc = res.data.description,
        this.form.price = res.data.sale_price
      });
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
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.form-btn {
  margin-top: 20px;
}
</style>
