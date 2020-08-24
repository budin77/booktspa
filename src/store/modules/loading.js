const state = {
  count: 0,
  isLoading: false,
};

const mutations = {
  SET_LOADING(state, isLoading) {
    state.isLoading = isLoading;
  },
  INCREMENT_COUNT(state) {
    state.count++;
  },
  DECREMENT_COUNT(state) {
    state.count--;
  },
};

const actions = {
  setLoading({ state, commit }, isLoading) {
    if (isLoading) {
      commit('INCREMENT_COUNT');
      commit('SET_LOADING', true);
    } else if (state.count > 0) {
      commit('DECREMENT_COUNT');
      if (state.count > 0) {
        commit('SET_LOADING', true);
      } else {
        commit('SET_LOADING', false);
      }
    }
  },
};

const getters = {
  isLoading(state) {
    return state.isLoading;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
