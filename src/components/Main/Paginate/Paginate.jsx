import React from "react";
const Paginate = ({
  totalPages,
  currentPage,
  setCurrentPage,
  searchedSpaceCrafts,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      {currentPage > 1 && searchedSpaceCrafts.length > 6 && (
        <p
          onClick={() => {
            setCurrentPage((previousPage) => previousPage - 1);
          }}
        >
          Previous
        </p>
      )}
      {currentPage < totalPages && searchedSpaceCrafts.length > 6 && (
        <p
          onClick={() => {
            setCurrentPage((previousPage) => previousPage + 1);
          }}
        >
          Next
        </p>
      )}
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-number">
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Paginate;
