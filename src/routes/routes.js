import Home from '../components/home/Home.vue';
import Register from '../components/register/Register.vue';
import Resume from '../components/resume/Resume.vue';
import Checkout from '../components/checkout/Checkout.vue';
import Login from '../components/login/Login.vue';
import NotAuthorized from '../components/not-authorized/NotAuthorized.vue';

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
