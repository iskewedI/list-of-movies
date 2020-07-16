import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";
class MoviesTable extends Component {
  render() {
    const btnStyle = "btn btn-sm btn-danger";
    const columns = [
      {
        name: "Title",
        path: "title",
        content: (movie) => (
          <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
        ),
      },
      { name: "Genre", path: "genre.name" },
      { name: "Stock", path: "numberInStock" },
      { name: "Rate", path: "dailyRentalRate" },
      {
        key: "like",
        content: (movie) => (
          <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
        ),
      },
      {
        key: "delete",
        content: (movie) => (
          <button
            onClick={() => this.props.onDelete(movie._id)}
            className={btnStyle}
          >
            Delete
          </button>
        ),
      },
    ];
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        data={movies}
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}
export default MoviesTable;
