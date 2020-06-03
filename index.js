import Vue from 'vue'
import App from './App'
import axios from 'axios';
import VueRouter from 'vue-router';
Vue.use(VueRouter)

import AddItem from './pages/AddItem.vue';
import Main from './pages/Main.vue';
axios.defaults.baseURL = 'http://localhost:7000';

const routes = [
  {
    path: '/',
    name: 'root',
    component: Main
  },
  {
    path: '/todo',
    name: 'add',
    component: AddItem,
  }
];
const router = new VueRouter(
  {
    mode: 'history',
    routes
  },
)
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')