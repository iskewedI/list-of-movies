import React, { Component } from "react";

class Movie extends Component {
  render() {
    const { _id, title, genre, stock, rate, children } = this.props;
    return (
      <tr>
        <td>{title}</td>
        <td>{genre}</td>
        <td>{stock}</td>
        <td>{rate}</td>
        <td>{children}</td>
      </tr>
    );
  }
}

export default Movie;
