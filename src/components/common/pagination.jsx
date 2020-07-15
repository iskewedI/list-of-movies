import React from "react";
import PropTypes from "prop-types";
import _ from "lodash"; //Lodash is the optimized version of "underscore", a js library.

const Pagination = ({ itemsCount, pageSize, selectedPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <React.Fragment>
      <nav aria-label="Pagination buttons">
        <ul className="pagination">
          {pages.map((page) => (
            <li
              key={page}
              className={
                page === selectedPage ? "page-item active" : "page-item"
              }
            >
              <button className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </React.Fragment>
  );
};
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  selectedPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
