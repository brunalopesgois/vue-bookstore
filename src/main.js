import Vue from 'vue';
import App from './App.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueRouter from 'vue-router';
import { routes } from './routes/routes';
import Vuex from 'vuex';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  if (!to.meta.public && !localStorage.getItem('token')) {
    return next({ path: '/login' });
  }
  next();
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});

