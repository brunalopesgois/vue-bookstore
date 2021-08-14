<template>
  <div class="content">
    <b-container fluid>
      <my-section>
        <b-row align-v="center">
          <b-col class=" d-flex justify-content-end">
            <img class="login-img" src="/src/assets/coruja.png">
          </b-col>
          <b-col>
            <div class="form-panel d-flex justify-content-end">
              <b-form @submit="onSubmit">
                <h1 class="login-title">LOGIN</h1>
                <b-form-group
                  id="input-group"
                >
                  <b-form-input
                    id="input-1"
                    v-model="form.email"
                    placeholder="E-mail"
                    type="email"
                    min="3"
                    required
                  ></b-form-input>
                </b-form-group>
                <br>
                <b-form-group
                  id="input-group"
                >
                  <b-form-input
                    id="input-2"
                    v-model="form.password"
                    placeholder="Senha"
                    type="password"
                    min="3"
                    required
                  ></b-form-input>
                </b-form-group>
                <br>
                <div class="form-btn d-flex justify-content-end">
                  <b-button type="submit" variant="primary" size="lg">Entrar</b-button>
                </div>
              </b-form>
            </div>
          </b-col>
        </b-row>
      </my-section>
    </b-container>
  </div>
</template>

<script>
import { BContainer } from 'bootstrap-vue';
import { BForm } from 'bootstrap-vue';
import { BFormGroup } from 'bootstrap-vue';
import { BFormInput } from 'bootstrap-vue';
import axios from 'axios';
import Section from '../shared/section/Section.vue';
import { BCol } from 'bootstrap-vue';
import { BRow } from 'bootstrap-vue';
export default {
  components: {
    'b-container': BContainer,
    'b-form': BForm,
    'b-form-group': BFormGroup,
    'b-form-input': BFormInput,
    'my-section': Section,
    'b-col': BCol,
    'b-row': BRow
  },
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      axios.post('http://localhost:8000/api/login', {
        email: this.form.email,
        password: this.form.password
      })
      .then(res => {
        localStorage.setItem('token', res.data.generated_token);
        this.$router.back();
        this.storeUser();
      })
      .catch(e => {
        console.log(e);
      });
    },
    storeUser() {
      axios.get('http://localhost:8000/api/user', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then(res => {
        localStorage.setItem('userName', res.data.name);
        localStorage.setItem('userProfile', res.data.email);
        location.reload();
      })
      .catch(e => {
        console.log(e);
      });
    }
  }
}
</script>

<style>
.content {
  flex: 1 100vh;
}
.form-btn {
  margin-top: 20px;
}
.login-img {
  width: auto;
  height: 400px;
  opacity: 15%;
}
.login-title {
  margin-bottom: 30px;
}
#input-group {
  width: 350px;
}
</style>
