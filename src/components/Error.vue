<template>
  <div class="alert alert-danger m-5" role="alert">
    <h4 class="alert-heading">Something went wrong!</h4>
    <hr />
    <p class="mb-0" v-for="(error, index) in errors" :key="index">
      {{ error }}
    </p>
  </div>
</template>
<script>
export default {
  props: ['errors'],
};
</script>
