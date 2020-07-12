import React, { Component } from "react";

class Movie extends Component {
  data = {};
  constructor(props) {
    super();
    this.data = { ...props };
  }
  render() {
    const { _id, title, genre, stock, rate, handleDelete } = this.data.props;
    return (
      <tr>
        <td>{title}</td>
        <td>{genre}</td>
        <td>{stock}</td>
        <td>{rate}</td>
        <td>
          <button
            onClick={() => handleDelete(_id)}
            className="btn btn-sm btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default Movie;
