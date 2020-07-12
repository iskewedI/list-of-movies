import React, { Component } from "react";
import Movie from "./movie";
import { getMovies, deleteMovie } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies(),
    titles: ["Title", "Genre", "Stock", "Rate", ""],
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
  render() {
    const { movies, titles, btnStyle } = this.state;
    return (
      <React.Fragment>
        {this.topMessage()}
        {movies.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                {titles.map((title) => (
                  <th key={title}>{title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <Movie key={movie._id} data={movie}>
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
