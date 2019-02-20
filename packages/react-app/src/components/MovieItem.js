import React from 'react';

import moment from 'moment';

/**
 * MovieItem component
 */
const MovieItem = ({ movie, onMovieSelected }) => {
  const {
    title, overview, release_date, poster_path,
  } = movie;

  const releaseYear = release_date ? moment(release_date).format('YYYY') : '';

  return (
    <div className="col s12 m6 l4 xl3">
      <div className="card large">
        <div className="card-image waves-effect waves-block waves-light">
          <img
            alt="movie-poster"
            src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
            className="activator"
          />
        </div>
        <div className="card-content">
          <span className="card-title activator grey-text text-darken-4">
            {title}
            <i className="material-icons right">more_vert</i>
          </span>
          <p>{releaseYear}</p>
        </div>
        <div className="card-action">
          <a href="#!" onClick={() => onMovieSelected(movie)}>
            Find Similar
          </a>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">
            {title}
            <i className="material-icons right">close</i>
          </span>
          <p>{releaseYear}</p>
          <p>{overview || 'Resumo não disponível'}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieItem;
