import router from '@/router';
import { login, getUser } from '@/api/users';

const state = {
  token: null,
  userId: null,
  user: null,
};

const mutations = {
  SET_USER_AUTH(state, userAuth) {
    state.token = userAuth.token;
    state.userId = userAuth.userId;
  },
  SET_USER_INFO(state, userInfo) {
    state.user = userInfo;
  },
  CLEAR_USER_DATA() {
    state.token = null;
    state.userId = null;
    state.user = null;
  },
  CLEAR_USER_INFO() {
    state.user = null;
  },
};

const actions = {
  async login({ commit, dispatch }, authData) {
    try {
      const res = await login(authData);
      if (res.data.status === 'success') {
        const userAuthData = {
          token: res.data.token,
          userId: res.data.data.user._id,
        };
        const userInfo = res.data.data;

        localStorage.setItem('token', userAuthData.token);
        localStorage.setItem('userId', userAuthData.userId);

        commit('SET_USER_AUTH', userAuthData);
        commit('SET_USER_INFO', userInfo);

        router.replace('/dashboard');
      } else {
        // handle error here
      }
    } catch (error) {
      dispatch('errors/postError', error.response.data.message, { root: true });
    }
  },

  tryAutoLogin({ commit }) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      return;
    }

    commit('SET_USER_AUTH', {
      token: token,
      userId: userId,
    });
  },

  logout({ commit }) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    commit('CLEAR_USER_DATA');
    router.replace('/login');
  },

  async fetchUser({ commit, state, dispatch }) {
    if (!state.token || !state.userId) {
      return;
    }

    try {
      const res = await getUser(state.userId);
      if (res.data.status === 'success') {
        commit('SET_USER_INFO', res.data.data.data);
      } else {
        // handle error here
      }
    } catch (error) {
      dispatch('errors/postError', error.response.data.message, { root: true });
    }
  },
  clearUserInfo({ commit }) {
    commit('CLEAR_USER_INFO');
  },
};

const getters = {
  getUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.token !== null;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
