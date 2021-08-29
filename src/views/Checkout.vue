<template>
  <div class="content">
    <my-user :name="user.name" :profile="user.profile"></my-user>
    <b-container fluid>
      <my-section>
        <div v-if="!success" class="form-panel">
          <b-form @submit="onSubmit" @reset="onReset">
            <b-form-group
              id="input-group-1"
              label="Número do Cartão:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="form.cardNumber"
                type="text"
                min="3"
                required
              ></b-form-input>
            </b-form-group>
            <br>
            <b-form-group
              id="input-group-2"
              label="Nome no cartão:"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                v-model="form.ownerName"
                type="text"
                min="3"
                required
              ></b-form-input>
            </b-form-group>
            <br>
            <div class="minor-field">
              <b-form-group
                id="input-group-3"
                label="Data de Validade:"
                label-for="input-3"
              >
                <b-form-input
                  id="input-3"
                  v-model="form.date"
                  type="date"
                  required
                ></b-form-input>
              </b-form-group>
              <br>
              <b-form-group
                id="input-group-4"
                label="Código Segurança:"
                label-for="input-4"
              >
                <b-form-input
                  id="input-4"
                  v-model="form.securityNumber"
                  type="number"
                  max="999"
                  required
                ></b-form-input>
              </b-form-group>
            </div>
            <br>
            <div class="form-btn">
              <b-button type="submit" variant="success">Finalizar Compra</b-button>
              <b-button type="reset" variant="danger">Limpar</b-button>
            </div>
          </b-form>
        </div>
          <img v-if="success" class="success-img" src="/src/assets/success.png" alt="">
          <h2 v-if="success" class="d-flex justify-content-center">Compra efetuada! Verifique seu e-mail.</h2>
      </my-section>
    </b-container>
  </div>
</template>

<script>
import { BContainer } from 'bootstrap-vue';
import { BForm } from 'bootstrap-vue';
import { BFormGroup } from 'bootstrap-vue';
import { BFormInput } from 'bootstrap-vue';
import { BFormFile } from 'bootstrap-vue';
import { BFormTextarea } from 'bootstrap-vue';
import axios from 'axios';
import Section from '../components/Section.vue';
import { BAlert } from 'bootstrap-vue';
import UserInfo from '../components/UserInfo.vue';
export default {
  components: {
    'b-container': BContainer,
    'b-form': BForm,
    'b-form-group': BFormGroup,
    'b-form-input': BFormInput,
    'b-form-file': BFormFile,
    'b-form-textarea': BFormTextarea,
    'my-section': Section,
    'b-alert': BAlert,
    'my-user': UserInfo
  },
  data() {
    return {
      form: {
        cardNumber: '',
        ownerName: '',
        date: '',
        securityNumber: ''
      },
      id: this.$route.params.id,
      success: false,
      user: {
        name: localStorage.getItem('userName') ? localStorage.getItem('userName') : '',
        profile: localStorage.getItem('userProfile') ? localStorage.getItem('userProfile') : ''
      }
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      axios.post(`/api/checkout/books/${this.id}`,
      {
        card_number: this.form.cardNumber,
        owner_name: this.form.ownerName,
        expiration_date: this.form.date,
        cvv: this.form.securityNumber
      },
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then(res => {
        this.success = true;
      })
      .catch(e => {
        console.log(e);
      });
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.cardNumber = '';
      this.form.ownerName = '';
      this.form.date = '';
      this.form.securityNumber = '';
    }
  }
}
</script>

<style>
.content {
  flex: 1 100vh;
}
.form-panel {
  width: 40%;
  margin-left: auto;
  margin-right: auto;
}
.form-btn {
  margin-top: 20px;
}
.minor-field {
  width: 50%;
}
.success-img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
