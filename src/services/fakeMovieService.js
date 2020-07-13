import * as genresAPI from "./fakeGenreService";

const movies = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    title: "Terminator",
    genre: "Action",
    numberInStock: 6,
    dailyRentalRate: 2.5,
    liked: false,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    title: "Die Hard",
    genre: "Action",
    numberInStock: 5,
    dailyRentalRate: 2.5,
    liked: false,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    title: "Get Out",
    genre: "Thriller",
    numberInStock: 8,
    dailyRentalRate: 3.5,
    liked: false,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    title: "Trip to Italy",
    genre: "Comedy",
    numberInStock: 7,
    dailyRentalRate: 3.5,
    liked: false,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    title: "Airplane",
    genre: "Comedy",
    numberInStock: 7,
    dailyRentalRate: 3.5,
    liked: false,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    title: "Wedding Crashers",
    genre: "Comedy",
    numberInStock: 7,
    dailyRentalRate: 3.5,
    liked: false,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    title: "Gone Girl",
    genre: "Thriller",
    numberInStock: 7,
    dailyRentalRate: 4.5,
    liked: false,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181f",
    title: "The Sixth Sense",
    genre: "Thriller",
    numberInStock: 4,
    dailyRentalRate: 3.5,
    liked: false,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    title: "The Avengers",
    genre: "Action",
    numberInStock: 7,
    dailyRentalRate: 3.5,
    liked: false,
  },
];

export function getMovies() {
  return movies;
}

export function getMovie(id) {
  return movies.find((m) => m._id === id);
}

export function saveMovie(movie) {
  let movieInDb = movies.find((m) => m._id === movie._id) || {};
  movieInDb.name = movie.name;
  movieInDb.genre = genresAPI.genres.find((g) => g._id === movie.genreId);
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;

  if (!movieInDb._id) {
    movieInDb._id = Date.now();
    movies.push(movieInDb);
  }

  return movieInDb;
}

export function deleteMovie(id) {
  let movieInDb = movies.find((m) => m._id === id);
  movies.splice(movies.indexOf(movieInDb), 1);
  return movieInDb;
}

export function doLikeMovie(id) {
  let movie = movies.find((movie) => movie._id === id);
  let index = movies.indexOf(movie);
  movies[index].liked = !movies[index].liked;
}
