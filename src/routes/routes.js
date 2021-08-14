import Home from '../components/home/Home.vue';
import Register from '../components/register/Register.vue';
import Resume from '../components/resume/Resume.vue';
import Checkout from '../components/checkout/Checkout.vue';
import Login from '../components/login/Login.vue';

export const routes = [
  {
    path: '',
    name: 'home',
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/register/:id',
    name: 'update',
    component: Register
  },
  {
    path: '/resume/:id',
    name: 'resume',
    component: Resume
  },
  {
    path: '/checkout/:id',
    name: 'checkout',
    component: Checkout
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
];
