import Home from '../components/home/Home.vue';
import Register from '../components/register/Register.vue';
import Resume from '../components/resume/Resume.vue';

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
];
