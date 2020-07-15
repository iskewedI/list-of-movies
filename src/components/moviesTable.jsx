import React, { Component } from "react";
import Like from "./common/like";
import Movie from "./common/movie";

class MoviesTable extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };
  render() {
    const { movies, titles, onDelete, onLike } = this.props;
    const btnStyle = "btn btn-sm btn-danger";
    return (
      <table className="table">
        <thead>
          <tr>
            {titles.map((title, index) => (
              <th key={index} onClick={() => this.raiseSort(title.path)}>
                {title.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <Movie key={movie._id} data={movie}>
              <Like liked={movie.liked} onClick={() => onLike(movie)} />
              <button onClick={() => onDelete(movie._id)} className={btnStyle}>
                Delete
              </button>
            </Movie>
          ))}
        </tbody>
      </table>
    );
  }
}
export default MoviesTable;
