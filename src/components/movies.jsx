import React, { Component } from "react";
import Movie from "./movie";
import { getMovies, deleteMovie } from "../services/fakeMovieService";

class Movies extends Component {
  state = { movies: getMovies() };

  topMessage = () => {
    const length = this.state.movies.length;
    return length === 0 ? (
      <h5>There are no movies in the database</h5>
    ) : (
      <h5>Showing {length} movies in the database.</h5>
    );
  };
  handleDelete = (movieId) => {
    console.log("Deleting...", movieId);
    deleteMovie(movieId);
    this.setState({ movies: getMovies() });
  };
  render() {
    const { movies } = this.state;
    return (
      <React.Fragment>
        {this.topMessage()}
        {movies.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <Movie
                  key={movie._id}
                  props={{
                    _id: movie._id,
                    title: movie.title,
                    genre: movie.genre.name,
                    stock: movie.numberInStock,
                    rate: movie.dailyRentalRate,
                    handleDelete: this.handleDelete,
                  }}
                />
              ))}
            </tbody>
            {/* <tr className="container">
              <hr />
              <h4 key="Titles" className="row">
                <div className="col-sm">Title</div>
                <div className="col-sm">Genre</div>
                <div className="col-sm">Stock</div>
                <div className="col-sm">Rating</div>
              </h4>
              <hr />
              {movies.map((movie) => (
                <Movie
                  key={movie._id}
                  props={{
                    _id: movie._id,
                    title: movie.title,
                    genre: movie.genre.name,
                    stock: movie.numberInStock,
                    rate: movie.dailyRentalRate,
                    handleDelete: this.handleDelete,
                  }}
                />
              ))}
            </tr> */}
          </table>
        )}
      </React.Fragment>
    );
  }
}

export default Movies;
