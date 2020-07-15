import React, { Component } from "react";
import _ from "lodash";
import {
  getMovies,
  deleteMovie,
  doLikeMovie,
} from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
class Movies extends Component {
  state = {
    allMovies: [],
    titles: [
      { name: "Title", path: "title" },
      { name: "Genre", path: "genre.name" },
      { name: "Stock", path: "numberInStock" },
      { name: "Rate", path: "dailyRentalRate" },
      { name: "", path: "" },
      { name: "", path: "" },
    ],
    pageSize: 4,
    selectedPage: 1,
    genres: [],
    selectedGenre: null,
    sortColumn: {
      path: "title",
      order: "asc",
    },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ allMovies: getMovies(), genres: genres });
  }

  handleDelete = (movieId) => {
    deleteMovie(movieId);
    this.setState({ allMovies: getMovies() });
  };
  handleLike = (movie) => {
    doLikeMovie(movie._id);
    this.setState(getMovies());
  };
  handlePageChange = (pageNumber) => {
    this.setState({ selectedPage: pageNumber });
  };
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, selectedPage: 1 });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    const {
      allMovies,
      titles,
      pageSize,
      selectedPage,
      genres,
      selectedGenre,
      sortColumn,
    } = this.state;
    const count = allMovies.length;

    if (count === 0) return <h5>There are no movies in the database</h5>;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, selectedPage, pageSize);
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <h5>Showing {filtered.length} movies in the database.</h5>
          <MoviesTable
            movies={movies}
            titles={titles}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            selectedPage={selectedPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
