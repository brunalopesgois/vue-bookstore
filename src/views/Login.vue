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
                <div class="login-info">
                  <p><b>Admin</b>: admin@example.com | admin</p>
                  <p><b>Client</b>: client@example.com | client</p>
                </div>
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
import Section from '../components/Section.vue';
import { BCol } from 'bootstrap-vue';
import { BRow } from 'bootstrap-vue';
import LoginService from '../services/auth/LoginService';
import UserService from '../services/auth/UserService';
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

      const loginService = new LoginService();

      loginService.create(this.form.email, this.form.password)
      .then(res => {
        localStorage.setItem('token', res.data.generated_token);
        this.$router.back();
        this.storeUser();
      })
      .catch(e => {
        let error = e.toJSON();
        this.failedLogin(error.message);
        console.log(e);
      });
    },
    storeUser() {
      const userService = new UserService();

      userService.find()
      .then(res => {
        let profile = res.data.profile.charAt(0).toUpperCase() + res.data.profile.slice(1);

        localStorage.setItem('userName', res.data.name);
        localStorage.setItem('userProfile', profile);
        location.reload();
      })
      .catch(e => {
        console.log(e);
      });
    },
    failedLogin(errorMessage) {
      if (errorMessage.includes('401')) {
        this.$toasted.error("E-mail ou senha incorreto(s).").goAway(2000);
        this.form.email = '';
        this.form.password = '';
        return;
      }

      this.$toasted.error("Ocorreu um erro interno. Tente novamente mais tarde.").goAway(2000);
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
.login-info {
  border: 1px solid chocolate;
  border-radius: 10px;
  background-color: rgb(210, 105, 30, .3);
  color: chocolate;
  padding-top: 3%;
  padding-left: 3%;
  margin-bottom: 5%;
}
</style>
