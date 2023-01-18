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

  //   const highLightPageNumber = () => {
  //     const pages = document.querySelectorAll(".pagination__item");
  //     pages.forEach((page) => {
  //       page.classList.remove("pagination__list--highlight");
  //     });
  //     pages[currentPage - 1].classList.add("pagination__list--highlight");
  //   };

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

      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            className={number === currentPage && "pagination__item--highlight"}
            key={number}
          >
            {number}
          </li>
        ))}
      </ul>
      {currentPage < totalPages && searchedSpaceCrafts.length > 6 && (
        <p
          onClick={() => {
            setCurrentPage((previousPage) => previousPage + 1);
          }}
        >
          Next
        </p>
      )}
    </div>
  );
};

export default Paginate;
