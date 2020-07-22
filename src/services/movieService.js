import httpService from "./httpService";

const apiEndpoint = "/movies";

function getMovieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getMovies() {
  return httpService.get(apiEndpoint);
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
  return httpService.post(apiEndpoint, movie);
}

export function deleteMovie(id) {
  return httpService.delete(getMovieUrl(id));
}
