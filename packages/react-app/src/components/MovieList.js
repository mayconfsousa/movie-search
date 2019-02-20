import React from 'react';

import MovieItem from './MovieItem';
import Pagination from './Pagination';

/**
 * MovieList component
 */
const MovieList = ({
  movies, info, onPaginate, onMovieSelected,
}) => (
  <div>
    <div className="col s12">
      {movies.map(movie => (
        <MovieItem key={movie.id} movie={movie} onMovieSelected={onMovieSelected} />
      ))}
    </div>
    {movies.length ? (
      <Pagination info={info} onPaginate={onPaginate} />
    ) : (
      <div className="col s12 center-align">
        <p>No results found.</p>
      </div>
    )}
  </div>
);

export default MovieList;
