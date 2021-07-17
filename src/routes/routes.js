import Home from '../components/home/Home.vue';
import Register from '../components/register/Register.vue';

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
];
