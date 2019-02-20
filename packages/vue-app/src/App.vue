<template>
  <div class="row">
    <div class="col s12">
      <blockquote>
        <p class="movieListTitle" v-if="selectedMovie.title">Similar movies found for
          <br>
          <strong>{{selectedMovie.title}} ({{selectedMovie.release_date | extractYear}})</strong>
        </p>
      </blockquote>
    </div>
    <movie-list :movies="similarMovies" v-if="similarMovies.length"></movie-list>
    <div class="col s12 center-align" v-else>
      <p>No results found.</p>
    </div>
  </div>
</template>

<script>
import moment from "moment";

import { TheMovieDbApi } from "@tcc/shared";

import MovieList from "./components/MovieList.vue";

export default {
  name: "app",
  components: {
    MovieList
  },
  data: () => ({
    selectedMovie: {},
    similarMovies: []
  }),
  methods: {
    /**
     * Generic API error handler
     */
    apiErrorHandler(response) {
      const { errors } = response.data;
      if (errors && errors.length) M.toast({ html: errors.join("<br>") });
    },

    /**
     * Load similar movies from HTTP response data
     */
    async loadSimilarMovies(movieId) {
      const response = await TheMovieDbApi.getSimilarMovies(movieId);
      const { ok, data } = response;

      if (ok) {
        const { results } = data;

        // Remove movies without poster image
        this.similarMovies = results.filter(r => r.poster_path);
      } else {
        this.apiErrorHandler(response);
      }
    },

    /**
     * Movie selected event handler
     */
    movieSelectedHandler(movie) {
      this.selectedMovie = movie;
      this.loadSimilarMovies(movie.id);
    }
  },
  filters: {
    extractYear(date) {
      return date ? moment(date).format("YYYY") : "";
    }
  },
  created() {
    if (window.eev) window.eev.on("movie-selected", this.movieSelectedHandler);
  },
  beforeDestroy() {
    if (window.eev) window.eev.off("movie-selected", this.movieSelectedHandler);
  }
};
</script>

<style scoped>
.movieListTitle {
  font-size: 18px;
}
</style>
