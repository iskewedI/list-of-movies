import React, { Component } from "react";
import Movie from "./movie";
import {
  getMovies,
  deleteMovie,
  doLikeMovie,
} from "../services/fakeMovieService";
import Like from "./like";

class Movies extends Component {
  state = {
    movies: getMovies(),
    titles: ["Title", "Genre", "Stock", "Rate", "", ""],
    btnStyle: "btn btn-sm btn-danger",
  };

  topMessage = () => {
    const length = this.state.movies.length;
    return length === 0 ? (
      <h5>There are no movies in the database</h5>
    ) : (
      <h5>Showing {length} movies in the database.</h5>
    );
  };
  handleDelete = (movieId) => {
    deleteMovie(movieId);
    this.setState({ movies: getMovies() });
  };
  handleLike = (movie) => {
    // const movies = [...this.state.movies];
    // const index = movies.indexOf(movie);
    // movies[index] = { ...movies[index] };
    // movies[index].liked = !movies[index].liked;
    doLikeMovie(movie._id);
    this.setState(getMovies());
  };

  render() {
    const { movies, titles, btnStyle } = this.state;
    return (
      <React.Fragment>
        {this.topMessage()}
        {movies.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                {titles.map((title, index) => (
                  <th key={index}>{title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <Movie key={movie._id} data={movie} onClick={this.handleClick}>
                  <Like
                    liked={movie.liked}
                    onClick={() => this.handleLike(movie)}
                  />
                  <button
                    onClick={() => this.handleDelete(movie._id)}
                    className={btnStyle}
                  >
                    Delete
                  </button>
                </Movie>
              ))}
            </tbody>
          </table>
        )}
      </React.Fragment>
    );
  }
}

export default Movies;
