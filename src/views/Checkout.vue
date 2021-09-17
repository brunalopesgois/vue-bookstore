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
                v-cleave="{creditCard: true}"
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
                  type="text"
                  placeholder="Mês/Ano"
                  v-cleave="{date: true,datePattern: ['m', 'Y'],delimiter:'/'}"
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
                  type="text"
                  v-cleave="{numeral: true,numeralPositiveOnly: true,numeralIntegerScale: 3}"
                  required
                ></b-form-input>
              </b-form-group>
            </div>
            <br>
            <b-button id="popover-target-1" v-b-toggle="'collapse-1'" class="m-1" variant="warning">Desejo receber a confirmação da compra por email</b-button>
            <b-popover target="popover-target-1" triggers="hover" placement="top">
              <template #title>Informações</template>
              Para usar a funcionalidade de mensageria, inclua seu gmail, certifique-se de que a opção de permitir apps menos seguros esteja ativa.
            </b-popover>
            <b-collapse id="collapse-1">
              <br>
              <b-form-group
                id="input-group-5"
                label="E-mail:"
                label-for="input-5"
              >
                <b-form-input
                  id="input-5"
                  placeholder="Seu e-mail..."
                  v-model="form.mail"
                  type="email"
                ></b-form-input>
              </b-form-group>
            </b-collapse>
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
import UserInfo from '../components/UserInfo.vue';
import CheckoutService from '../services/checkout/CheckoutService';
import { BCollapse } from 'bootstrap-vue';
import { BPopover } from 'bootstrap-vue';
export default {
  components: {
    'b-container': BContainer,
    'b-form': BForm,
    'b-form-group': BFormGroup,
    'b-form-input': BFormInput,
    'b-form-file': BFormFile,
    'b-form-textarea': BFormTextarea,
    'my-section': Section,
    'my-user': UserInfo,
    'b-collapse': BCollapse,
    'b-popover': BPopover
  },
  data() {
    return {
      form: {
        cardNumber: '',
        ownerName: '',
        date: '',
        securityNumber: '',
        mail: ''
      },
      id: this.$route.params.id,
      success: false,
      user: {
        name: localStorage.getItem('userName') ? localStorage.getItem('userName') : '',
        profile: localStorage.getItem('userProfile') ? localStorage.getItem('userProfile') : ''
      }
    }
  },
  created() {
    this.service = new CheckoutService();
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.service.create(this.id, this.form)
      .then(res => {
        this.success = true;
      })
      .catch(e => {
        this.$toasted.error("Não foi possível finalizar a compra. Tente novamente mais tarde.").goAway(3000);
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
