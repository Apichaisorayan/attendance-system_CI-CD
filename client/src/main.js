import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import './style.css';
import App from './App.vue';
import Register from './pages/Register.vue';
import CheckIn from './pages/CheckIn.vue';

const routes = [
  { path: '/', redirect: '/checkin' },
  { path: '/register', component: Register },
  { path: '/checkin', component: CheckIn }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

createApp(App).use(router).mount('#app');
