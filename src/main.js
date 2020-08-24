import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { httpClient, httpClientAuth } from '@/api/httpClient';

Vue.config.productionTip = false;
Vue.config.errorHandler = (_err, vm, info) => {
  store.dispatch('errors/postError', 'Application Error.');
};

Vue.directive('focus', {
  inserted: function(el) {
    el.focus();
  },
});

httpClientAuth.interceptors.request.use(
  (config) => {
    store.dispatch('loading/setLoading', true);
    const token = store.state.users.token;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    store.dispatch('loading/setLoading', false);
    return Promise.reject(error);
  }
);

httpClientAuth.interceptors.response.use(
  (response) => {
    store.dispatch('loading/setLoading', false);
    return response;
  },
  (error) => {
    store.dispatch('loading/setLoading', false);
    if (error.response.status === 401) {
      router.replace('/dashboard');
    }
    return Promise.reject(error);
  }
);

httpClient.interceptors.request.use(
  (config) => {
    store.dispatch('loading/setLoading', true);
    return config;
  },
  (error) => {
    store.dispatch('loading/setLoading', false);
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (response) => {
    store.dispatch('loading/setLoading', false);
    return response;
  },
  (error) => {
    store.dispatch('loading/setLoading', false);
    return Promise.reject(error);
  }
);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
