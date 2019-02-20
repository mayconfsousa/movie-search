import { create } from 'apisauce';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_LANGUAGE = '&language=pt-BR&region=BR';
const API_KEY = '544f087a09bba14073daac25e95b9ebf';

const api = create({
  baseURL: BASE_URL,
});

/**
 * GET /search/movie
 * Search for movies.
 * https://developers.themoviedb.org/3/search/search-movies
 */
const searchMovies = async (query, page = 1) => {
  const url = `/search/movie?api_key=${API_KEY}${API_LANGUAGE}&query=${query}&page=${page}`;
  const response = await api.get(url);
  return response;
};

/**
 * GET /movie/popular
 * Get a list of the current popular movies on TMDb. This list updates daily.
 * https://developers.themoviedb.org/3/movies/get-popular-movies
 */
const getPopularMovies = async (page = 1) => {
  const url = `/movie/popular?api_key=${API_KEY}${API_LANGUAGE}&page=${page}`;
  const response = await api.get(url);
  return response;
};

/**
 * GET /movie/{movie_id}/similar
 * Get a list of similar movies.
 * These items are assembled by looking at keywords and genres.
 * https://developers.themoviedb.org/3/movies/get-similar-movies
 */
const getSimilarMovies = async (movieId, page = 1) => {
  const url = `/movie/${movieId}/similar?api_key=${API_KEY}${API_LANGUAGE}&page=${page}`;
  const response = await api.get(url);
  return response;
};

export { searchMovies, getPopularMovies, getSimilarMovies };
