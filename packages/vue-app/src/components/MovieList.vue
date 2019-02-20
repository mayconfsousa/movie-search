<template>
  <div>
    <div class="col s12 card-item" v-for="movie in movies" :key="movie.id">
      <div class="card medium">
        <div class="card-image waves-effect waves-block waves-light">
          <img
            alt="movie-poster"
            :src="`https://image.tmdb.org/t/p/w200/${movie.poster_path}`"
            class="activator"
          >
        </div>
        <div class="card-content">
          <span class="card-title activator grey-text text-darken-4">
            {{ movie.title }}
            <i class="material-icons right">more_vert</i>
          </span>
          <p>{{ movie.release_date | extractYear }}</p>
        </div>
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">
            {{ movie.title }}
            <i class="material-icons right">close</i>
          </span>
          <p>{{ movie.release_date | extractYear }}</p>
          <p>{{ movie.overview || 'Resumo não disponível' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'MovieList',
  props: {
    movies: Array,
  },
  filters: {
    extractYear(date) {
      return date ? moment(date).format('YYYY') : '';
    },
  },
};
</script>

<style scoped>
.card-item {
  padding-left: 20px;
  padding-right: 20px;
}
</style>
