import Vue from 'vue'
import VueRouter from 'vue-router'
import { observador } from '../firebase/firebase.js'



Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import( '../views/Login.vue'),
  },
  {
    path: '/register',
    component: () => import( '../views/Register.vue'),
  },
  {
    path: '/home',
    component: () => import( '../views/Home.vue'),
  },
  {
    path: '/home2',
    component: () => import( '../views/HomePosible.vue'),
  },
  {
    path: '/admin',
    component: () => import( '../views/Admin.vue'),
  },
  {
    path: '/addcourse',
    component: () => import( '../views/AddCourses.vue'),
  }
] 

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  observador(to, next);
});



export default router