import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import Resume from '../views/Resume.vue';
import Checkout from '../views/Checkout.vue';
import Login from '../views/Login.vue';
import NotAuthorized from '../views/NotAuthorized.vue';

export const routes = [
  {
    path: '',
    name: 'home',
    component: Home,
    meta: {
      public: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      admin: true
    }
  },
  {
    path: '/register/:id',
    name: 'update',
    component: Register,
    meta: {
      admin: true
    }
  },
  {
    path: '/resume/:id',
    name: 'resume',
    component: Resume,
    meta: {
      public: true
    }
  },
  {
    path: '/checkout/:id',
    name: 'checkout',
    component: Checkout
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      public: true
    }
  },
  {
    path: '/not-authorized',
    name: 'forbidden',
    component: NotAuthorized,
    meta: {
      public: true
    }
  },
];
