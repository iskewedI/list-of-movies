import React, { Component } from "react";

class Movie extends Component {
  render() {
    const { children, data } = this.props;
    const { title, genre, numberInStock: stock, dailyRentalRate: rate } = data;
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
