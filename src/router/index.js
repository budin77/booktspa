import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '../store';

import NProgress from 'nprogress';

import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter(to, from, next) {
      store.dispatch('tours/clearTours');
      next();
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/tour/:slugId',
    name: 'Tour',
    component: () => import(/* webpackChunkName: "tour" */ '../views/Tour.vue'),
    beforeEnter(to, from, next) {
      store.dispatch('tours/clearTour');
      next();
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */ '../views/dashboard/Dashboard.vue'
      ),
    beforeEnter(to, from, next) {
      store.dispatch('users/clearUserInfo');
      store.dispatch('users/tryAutoLogin');

      if (store.state.users.token) {
        next();
      } else {
        next('/login');
      }
    },
  },
  { path: '*', redirect: '/' },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  },
});

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  store.dispatch('errors/clearErrors');
  if (to.name) {
    // Start the route progress bar.
    NProgress.start();
  }
  next();
});

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});

export default router;
