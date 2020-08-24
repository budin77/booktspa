<template>
  <div class="col-lg-4 col-md-6">
    <slot></slot>
  </div>
</template>

<style scoped>
.panel {
  border-radius: 0.3rem;
  padding: 1rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
}

.tour-cover-img {
  height: 300px;
  background-size: cover;
  background-position: 50% 50%;
}

.card__icon {
  height: 1.2rem;
  width: 1.2rem;
  fill: #000000;
}
</style>
