<template>
  <div>
    <app-header></app-header>
    <app-loading v-if="isLoading"></app-loading>
    <app-error v-if="errors.length" :errors="errors"></app-error>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Loading from './components/Loading.vue';
import Error from './components/Error.vue';

import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      errors: 'errors/getErrors',
      isLoading: 'loading/isLoading',
    }),
  },

  components: {
    appHeader: Header,
    appFooter: Footer,
    appError: Error,
    appLoading: Loading,
  },
  created() {
    this.$store.dispatch('users/tryAutoLogin');
  },
};
</script>
