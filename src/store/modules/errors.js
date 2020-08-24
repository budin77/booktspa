const state = {
  errors: [],
};

const mutations = {
  ADD_ERROR(state, payload) {
    state.errors.unshift(payload);
  },
  CLEAR_ERRORS() {
    state.errors = [];
  },
};

const actions = {
  postError({ commit }, errMsg) {
    commit('ADD_ERROR', errMsg);
  },
  clearErrors({ commit }) {
    commit('CLEAR_ERRORS');
  },
};

const getters = {
  getErrors(state) {
    return state.errors;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
