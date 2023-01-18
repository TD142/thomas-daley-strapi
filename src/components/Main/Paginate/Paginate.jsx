import "./Paginate.scss";
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
    <div className="pagination">
      <p
        className={
          currentPage > 1 && searchedSpaceCrafts.length > 6
            ? "pagination__text"
            : "pagination__text--hidden"
        }
        onClick={() => {
          setCurrentPage((previousPage) => previousPage - 1);
        }}
      >
        Previous
      </p>

      <ul className="pagination__list">
        {pageNumbers.map((number) => (
          <li
            className={`pagination__list__item ${
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
          currentPage < totalPages && searchedSpaceCrafts.length > 6
            ? "pagination__text"
            : "pagination__text--hidden"
        }
        onClick={() => {
          setCurrentPage((previousPage) => previousPage + 1);
        }}
      >
        Next
      </p>
    </div>
  );
};

export default Paginate;
