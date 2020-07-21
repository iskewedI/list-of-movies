import React, { Component } from "react";
import _ from "lodash";
import {
  getMovies,
  deleteMovie,
  doLikeMovie,
} from "../../services/movieService";
import { getGenres } from "../../services/genreService";
import { paginate } from "../../utils/paginate";
import Pagination from "../common/pagination";
import ListGroup from "../common/listGroup";
import MoviesTable from "../moviesTable";
import { Link } from "react-router-dom";
import SearchBox from "./../common/searchBox";
import { toast } from "react-toastify";

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

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    const { data: movies } = await getMovies();
    this.setState({ allMovies: movies, genres: genres });
  }

  handleDelete = async (movieId) => {
    const originalMovies = this.state.allMovies;
    const movies = originalMovies.filter((m) => m._id !== movieId);
    this.setState({ allMovies: movies });
    try {
      await deleteMovie(movieId);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie has already been deleted!");
      }
      this.setState({ allMovies: originalMovies });
    }
  };
  handleLike = async (movie) => {
    await doLikeMovie(movie);
    const { data: movies } = await getMovies();
    this.setState({ allMovies: movies });
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
    const { user } = this.props;

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
          {user && (
            <Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>
          )}

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
