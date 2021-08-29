import Vue from 'vue';
import App from './App.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueRouter from 'vue-router';
import { routes } from './routes/index';
import Vuex from 'vuex';
import axios from 'axios';
import Toasted from 'vue-toasted';
import Cleave from 'cleave.js';

axios.defaults.baseURL = process.env.API_URL;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Toasted, {
  iconPack: 'custom-class'
});

Vue.directive('cleave', {
  inserted: (el, binding) => {
      el.cleave = new Cleave(el, binding.value || {})
  },
  update: (el) => {
      const event = new Event('input', {bubbles: true});
      setTimeout(function () {
          el.value = el.cleave.properties.result
          el.dispatchEvent(event)
      }, 100);
  }
})

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  if (!to.meta.public && !localStorage.getItem('token')) {
    return next({ path: '/login' });
  }

  if (to.meta.admin && (localStorage.getItem('userProfile') != 'Admin')) {
    return next({ path: '/not-authorized'});
  }
  next();
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});

