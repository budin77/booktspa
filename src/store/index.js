import Vue from 'vue';
import Vuex from 'vuex';
import loading from './modules/loading.js';
import errors from './modules/errors.js';
import users from './modules/users.js';
import tours from './modules/tours.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    loading,
    errors,
    tours,
    users,
  },
});
