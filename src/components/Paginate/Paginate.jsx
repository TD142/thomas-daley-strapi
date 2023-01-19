import "./Paginate.scss";
const Paginate = ({
  totalPages,
  currentPage,
  setCurrentPage,
  searchedSpaceCrafts,
}) => {
  const pageNumbers = [];

  // Adding page numbers to array to map over
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <p
        // hide page change if there's less results than posts per page or current page is less than one
        className={
          currentPage > 1 && searchedSpaceCrafts.length > 6
            ? "pagination__text"
            : "pagination__text--hidden"
        }
        onClick={() => {
          setCurrentPage((previousPage) => previousPage - 1);
          window.scrollTo(0, 0);
        }}
      >
        &lt;
      </p>

      <ul className="pagination__list">
        {pageNumbers.map((number) => (
          <li
            onClick={() => {
              setCurrentPage(number);
              window.scrollTo(0, 0);
            }}
            className={`pagination__list__item ${
              // Highlight current page if numbers match
              number === currentPage && "pagination__list__item--highlight"
            }`}
            key={number}
          >
            {number}
          </li>
        ))}
      </ul>

      <p
        className={
          // same logic as for previous page but with the opposite logic
          currentPage < totalPages && searchedSpaceCrafts.length > 6
            ? "pagination__text"
            : "pagination__text--hidden"
        }
        onClick={() => {
          setCurrentPage((previousPage) => previousPage + 1);
          window.scrollTo(0, 0);
        }}
      >
        &gt;
      </p>
    </div>
  );
};

export default Paginate;
