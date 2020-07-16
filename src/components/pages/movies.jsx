import React, { Component } from "react";
import _ from "lodash";
import {
  getMovies,
  deleteMovie,
  doLikeMovie,
} from "../../services/fakeMovieService";
import { getGenres } from "../../services/fakeGenreService";
import { paginate } from "../../utils/paginate";
import Pagination from "../common/pagination";
import ListGroup from "../common/listGroup";
import MoviesTable from "../moviesTable";
import { Link } from "react-router-dom";
import Input from "../forms/input";
import SearchBox from "./../common/searchBox";
class Movies extends Component {
  state = {
    allMovies: [],
    pageSize: 4,
    selectedPage: 1,
    genres: [],
    selectedGenre: null,
    sortColumn: {
      path: "title",
      order: "asc",
    },
    searchQuery: "",
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
    this.setState({ selectedGenre: genre, selectedPage: 1, searchQuery: "" });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, selectedPage: 1 });
  };
  getPagedData = () => {
    const {
      allMovies,
      pageSize,
      selectedPage,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    let filtered = allMovies;

    if (searchQuery) {
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, selectedPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };
  render() {
    const {
      pageSize,
      selectedPage,
      genres,
      sortColumn,
      selectedGenre,
      searchQuery,
    } = this.state;
    const count = this.state.allMovies.length;

    if (count === 0) return <h5>There are no movies in the database</h5>;

    const { totalCount, data: movies } = this.getPagedData();
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
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>

          <h5>Showing {totalCount} movies in the database.</h5>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            itemsCount={totalCount}
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
