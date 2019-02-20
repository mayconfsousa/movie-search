import React, { Component } from 'react';

import { trim } from 'lodash';
import { TheMovieDbApi } from '@tcc/shared';

import { SearchBox, MovieList } from './components';

/**
 * Main App
 */
class App extends Component {
  state = {
    firstLoad: true,
    query: '',
    info: {},
    movies: [],
  };

  componentDidMount() {
    // Get popular movies initially
    this.getPopularMovies();
  }

  /**
   * Generic API error handler
   */
  apiErrorHandler = response => {
    const { errors } = response.data;
    if (errors && errors.length) M.toast({ html: errors.join('<br>') });
  };

  /**
   * Load movies from HTTP response data
   */
  loadMovies = (response, query) => {
    const { ok, data } = response;
    const { firstLoad } = this.state;

    if (ok) {
      const { results, ...info } = data;

      // Remove movies without poster image
      const movies = results.filter(r => r.poster_path);

      // Select the first poular movie for first load
      if (firstLoad && movies.length) this.onMovieSelected(movies[0]);

      this.setState({
        query,
        info,
        movies,
        firstLoad: false,
      });
    } else {
      this.apiErrorHandler(response);
    }
  };

  /**
   * Call API to get popular movies
   */
  getPopularMovies = async (page = 1) => {
    const response = await TheMovieDbApi.getPopularMovies(page);
    this.loadMovies(response);
  };

  /**
   * Call API to search movies by query
   */
  searchMovies = async (query, page = 1) => {
    if (!trim(query)) {
      // Get popular movies when query parameter not be provided
      this.getPopularMovies(page);
      return;
    }

    const response = await TheMovieDbApi.searchMovies(query, page);
    this.loadMovies(response, query);
  };

  /**
   * Call movie search with new page
   */
  paginateMovieList = page => this.searchMovies(this.state.query, page);

  /**
   * Emit an event indicating that a movie was selected
   */
  onMovieSelected = movie => window.eev && window.eev.emit('movie-selected', movie);

  render() {
    const { info, movies } = this.state;

    return (
      <div className="row">
        <SearchBox onChange={this.searchMovies} debounceWait={500} />
        <MovieList
          movies={movies}
          info={info}
          onPaginate={this.paginateMovieList}
          onMovieSelected={this.onMovieSelected}
        />
      </div>
    );
  }
}

export default App;
