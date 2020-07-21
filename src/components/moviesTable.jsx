import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";
import authService from "../services/authService";

class MoviesTable extends Component {
  btnStyle = "btn btn-sm btn-danger";
  columns = [
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
  ];

  deleteColumn = {
    key: "delete",
    content: (movie) => (
      <button
        onClick={() => this.props.onDelete(movie._id)}
        className={this.btnStyle}
      >
        Delete
      </button>
    ),
  };
  constructor() {
    super();
    const user = authService.getCurrentUser();
    if (user && user.isAdmin) {
      this.columns.push(this.deleteColumn);
    }
  }
  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        data={movies}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}
export default MoviesTable;
