import { getAllTours, getOneTour } from '@/api/tours';

const state = {
  tours: [],
  tour: null,
};

const actions = {
  async fetchTours({ commit, dispatch }) {
    try {
      const res = await getAllTours();
      if (res.data.status === 'success') {
        commit('SET_TOURS', res.data.data.data);
      } else {
        // handle error here
      }
    } catch (error) {
      dispatch('errors/postError', error.response.data.message, { root: true });
    }
  },
  async fetchOneTour({ commit, dispatch }, tourId) {
    try {
      const res = await getOneTour(tourId);
      if (res.data.status === 'success') {
        commit('SET_TOUR', res.data.data.data);
      } else {
        // handle error here
      }
    } catch (error) {
      dispatch('errors/postError', error.response.data.message, { root: true });
    }
  },
  clearTour({ commit }) {
    commit('CLEAR_TOUR');
  },
  clearTours({ commit }) {
    commit('CLEAR_TOURS');
  },
};

const mutations = {
  SET_TOURS(state, data) {
    state.tours = data;
  },
  SET_TOUR(state, data) {
    state.tour = data;
  },
  CLEAR_TOUR() {
    state.tour = null;
  },
  CLEAR_TOURS() {
    state.tour = [];
  },
};

const getters = {
  getTours(state) {
    return state.tours.map((el) => {
      el.firstStartDate = new Date(el.startDates[0]).toLocaleString('en-us', {
        month: 'long',
        year: 'numeric',
      });
      el.slugId = el.slug + '-' + el._id;
      return el;
    });
  },
  getOneTour(state) {
    return state.tour;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
