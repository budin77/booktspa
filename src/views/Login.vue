<template>
  <div>
    <div @submit.prevent="onSubmit" class="container h-100 p-3.msg mt-4">
      <div class="row h-100 justify-content-center align-items-center">
        <form class="col-md-6">
          <div class="form-group">
            <input
              v-focus
              v-model="email"
              class="form-control"
              type="email"
              id="inputEmail"
              placeholder="Email address"
              required
            />
          </div>
          <div class="form-group">
            <input
              v-model="password"
              class="form-control"
              type="password"
              id="inputPassword"
              placeholder="Password"
              required
            />
          </div>
          <button class="btn btn-lg btn-primary btn-block" id="submitButton">
            Sign in
          </button>

          <div class="alert alert-success" role="alert" style="margin-top:20px">
            <p>
              Testing Credentials
            </p>
            <hr />
            <p class="mb-0">
              Email address: bogdan.budin77@gmail.com<br />
              Password: test1234
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    ...mapActions('users', ['login']),
    ...mapActions('errors', ['clearErrors']),
    async onSubmit() {
      this.clearErrors();

      const formData = {
        email: this.email,
        password: this.password,
      };
      await this.login(formData);
    },
  },
};
</script>
