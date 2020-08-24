<template>
  <div class="container">
    <div class="row">
      <app-tour-box
        v-for="tour in tours"
        :key="tour._id"
        @click.native="navigateToTourPage(tour.slugId)"
        class="pointer"
      >
        <div class="card panel">
          <img
            class="card-img-top"
            :src="`${webBaseUrl}/img/tours/${tour.imageCover}`"
            :alt="`${tour.name}`"
          />
          <div class="card-body">
            <a href="#">
              <h5 class="card-title">{{ tour.name }}</h5>
            </a>
            <p class="card-text">{{ tour.summary }}</p>
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
              <span>{{ `${tour.difficulty} ${tour.duration}-days tour` }}</span>
            </li>
            <li class="list-group-item">
              <svg class="card__icon align-text-bottom">
                <use xlink:href="../assets/icons.svg#icon-calendar"></use>
              </svg>
              <span>{{ tour.firstStartDate }}</span>
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
            <button class="btn btn-primary btn-block">Details</button>
          </div>
        </div>
      </app-tour-box>
    </div>
  </div>
</template>

<script>
import TourBox from '@/components/TourBox.vue';

import { createNamespacedHelpers } from 'vuex';
const { mapActions, mapGetters } = createNamespacedHelpers('tours');

export default {
  computed: {
    ...mapGetters({
      tours: 'getTours',
    }),
    webBaseUrl() {
      return process.env.VUE_APP_WEB_BASE_URL;
    },
  },
  methods: {
    ...mapActions(['fetchTours']),
    navigateToTourPage(slugId) {
      this.$router.push({ name: 'Tour', params: { slugId } });
    },
  },
  components: {
    appTourBox: TourBox,
  },
  async mounted() {
    await this.fetchTours();
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
.pointer {
  cursor: pointer;
}
</style>
