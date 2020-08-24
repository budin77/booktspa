<template>
  <div>
    <nav v-if="user" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'Home' }" tag="a">Home</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          My Account
        </li>
      </ol>
    </nav>
    <div v-if="user" class="alert alert-success m-5" role="alert">
      <h4 class="alert-heading">Dashboard: {{ user.name }}</h4>
      <hr />
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
const { mapActions, mapGetters } = createNamespacedHelpers('users');

export default {
  computed: {
    ...mapGetters({
      user: 'getUser',
    }),
  },
  methods: {
    ...mapActions(['fetchUser']),
  },
  async mounted() {
    await this.fetchUser();
  },
};
</script>
