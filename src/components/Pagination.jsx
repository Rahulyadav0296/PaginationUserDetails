// src/components/Pagination.js
import React from "react";

const Pagination = ({ currentPage, onPageChange }) => {
  const MaxPagination = 10;
  const halfPagination = Math.floor(MaxPagination / 2);

  let startPage, endPage;

  if (currentPage <= halfPagination) {
    startPage = 1;
    endPage = MaxPagination;
  } else {
    startPage = currentPage - halfPagination;
    endPage = currentPage + halfPagination - 1;
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );
  console.log(pages);

  return (
    <nav>
      <ul className="pagination">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {pages.map((page) => (
          <li key={page} className={page === currentPage ? "active" : ""}>
            <button onClick={() => onPageChange(page)}>{page}</button>
          </li>
        ))}
        <li>
          <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
