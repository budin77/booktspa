<template>
  <div>
    <nav v-if="tour" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'Home' }" tag="a">Home</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ tour.name }}
        </li>
      </ol>
    </nav>
    <div
      v-if="tour"
      class="tour-cover-img"
      :style="
        `background-image:url('${webBaseUrl}/img/tours/${tour.imageCover}')`
      "
    ></div>
    <div v-if="tour" class="container">
      <div class="row">
        <div class="col">
          <div class="card panel">
            <div class="card-body">
              <h5 class="card-title">{{ tour.name }}</h5>
              <p class="card-text">{{ tour.description }}</p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <svg class="card__icon align-text-bottom">
                  <use xlink:href="../assets/icons.svg#icon-map-pin"></use>
                </svg>
                <span>{{ tour.startLocation.description }}</span>
              </li>
              <li class="list-group-item">
                <svg class="card__icon align-text-bottom">
                  <use xlink:href="../assets/icons.svg#icon-check-circle"></use>
                </svg>
                <span>{{
                  `${tour.difficulty} ${tour.duration}-days tour`
                }}</span>
              </li>
              <li class="list-group-item">
                <svg class="card__icon align-text-bottom">
                  <use xlink:href="../assets/icons.svg#icon-flag"></use>
                </svg>
                <span>{{ `${tour.locations.length} stops` }}</span>
              </li>
              <li class="list-group-item">
                <div class="float-left text-primary">
                  {{ `$${tour.price} per person` }}
                </div>
                <div class="float-right text-primary">
                  {{ `${tour.ratingsAverage}/${tour.ratingsQuantity} reviews` }}
                </div>
              </li>
            </ul>
            <div class="text-center card-body">
              <button class="btn btn-primary btn-block">Book it</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapActions, mapGetters } = createNamespacedHelpers('tours');

export default {
  computed: {
    ...mapGetters({
      tour: 'getOneTour',
    }),
    webBaseUrl() {
      return process.env.VUE_APP_WEB_BASE_URL;
    },
  },
  methods: {
    ...mapActions(['fetchOneTour']),
  },
  async mounted() {
    const arrSlugId = this.$route.params.slugId.split('-');
    const tourID = arrSlugId[arrSlugId.length - 1];
    await this.fetchOneTour(tourID);
  },
};
</script>

<style scoped>
.card__icon {
  height: 1.2rem;
  width: 1.2rem;
  fill: #000000;
  margin-right: 5px;
}

.tour-cover-img {
  height: 300px;
  background-size: cover;
  background-position: 50% 50%;
}
</style>
