import httpService from "./httpService";
import { apiMovies } from "./config.json";

function getMovieUrl(id) {
  return `${apiMovies}/${id}`;
}

export function getMovies() {
  return httpService.get(apiMovies);
}

export function getMovie(id) {
  return httpService.get(getMovieUrl(id));
}

export function doLikeMovie(movie) {
  const movieInDb = { ...movie };
  movieInDb.genreId = movie.genre._id;
  delete movieInDb.genre;
  delete movieInDb._id;
  movieInDb.liked = !movieInDb.liked;

  return httpService.put(getMovieUrl(movie._id), movieInDb);
}

export function saveMovie(movie) {
  if (movie._id) {
    let movieInDb = { ...movie };
    delete movieInDb._id;
    return httpService.put(getMovieUrl(movie._id), movieInDb);
  }
  return httpService.post(apiMovies, movie);
}

export function deleteMovie(id) {
  return httpService.delete(getMovieUrl(id));
}
