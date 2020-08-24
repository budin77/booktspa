<template>
  <nav class="navbar navbar-dark bg-dark">
    <router-link :to="{ name: 'Home' }" class="navbar-brand">
      <a>bookT</a>
    </router-link>
    <span class="navbar-text">
      <router-link
        v-if="auth"
        :to="{ name: 'Dashboard' }"
        tag="button"
        class="btn btn-outline-success ml-1"
      >
        My Account
      </router-link>
      <router-link
        v-if="!auth"
        :to="{ name: 'Login' }"
        tag="button"
        class="btn btn-outline-success ml-1"
      >
        Login
      </router-link>
      <button
        v-if="auth"
        @click="onLogout"
        tag="button"
        class="btn btn-outline-success ml-1"
      >
        Logout
      </button>
    </span>
  </nav>
</template>

<script>
export default {
  computed: {
    auth() {
      return this.$store.getters['users/isAuthenticated'];
    },
  },
  methods: {
    onLogout() {
      this.$store.dispatch('users/logout');
    },
  },
};
</script>
