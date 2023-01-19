import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL } from "../../utils/Api";
import Paginate from "../Paginate/Paginate";
import { Circles } from "react-loader-spinner";
import "./Main.scss";
const Main = () => {
  const [spaceCrafts, setSpaceCrafts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  // Filtering search results

  const searchedSpaceCrafts = spaceCrafts.filter((spaceCrafts) =>
    spaceCrafts.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  // Last spaceship on page index
  const lastPostIndex = currentPage * postsPerPage;

  // First spaceship on page index
  const firstPostIndex = lastPostIndex - postsPerPage;
  // Copying the results between first and last index for pagination
  const currentSpaceCrafts = searchedSpaceCrafts.slice(
    firstPostIndex,
    lastPostIndex
  );

  // Total number of pages
  const totalPages = Math.ceil(searchedSpaceCrafts.length / postsPerPage);

  const getData = async () => {
    const { data } = await axios.get(API_URL);

    setSpaceCrafts(data.spacecrafts);
  };

  const handleInputChange = (event) => {
    // Set page to one on each render so results are sorted from the beggining of page one
    setCurrentPage(1);
    // Input value held in state
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    getData();
  }, []);

  if (!spaceCrafts.length) {
    return (
      <div className="loading">
        <Circles color="white" height={60} width={60} />
        <p>Loading</p>
      </div>
    );
  } else {
    return (
      <div className="main">
        <div className="main__container">
          <div className="main__wrapper">
            <h2 className="main__wrapper__title">SPACECRAFTS</h2>
            <div className="search">
              <input
                // Error boundry for input
                className={`input ${
                  !searchedSpaceCrafts.length && "input--error"
                } `}
                placeholder="...Search"
                value={searchValue}
                onChange={handleInputChange}
                id="search"
                name="search"
                type="text"
              />
            </div>
          </div>

          {currentSpaceCrafts.length ? (
            currentSpaceCrafts.map((spaceCraft) => {
              return (
                // Using ternary to only show available data from API call
                <div className="spacecrafts" key={spaceCraft.uid}>
                  {spaceCraft.name && <p>Name: {spaceCraft.name}</p>}
                  {spaceCraft.registry && (
                    <p>Registry: {spaceCraft.registry}</p>
                  )}
                  {spaceCraft.status && <p>Status: {spaceCraft.status}</p>}
                  {spaceCraft.dateStatus && (
                    <p>DateStatus: {spaceCraft.dateStatus}</p>
                  )}

                  {spaceCraft.spacecraftClass && (
                    <p>SpacecraftClass: {spaceCraft.spacecraftClass.name}</p>
                  )}

                  {spaceCraft.owner && <p>Owner: {spaceCraft.owner.name}</p>}
                  {spaceCraft.operator && (
                    <p>Owner: {spaceCraft.operator.name}</p>
                  )}
                </div>
              );
            })
          ) : (
            // Error boundry for no search matches
            <p className="main__container__text">No Search Results!</p>
          )}
        </div>
        <Paginate
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          searchedSpaceCrafts={searchedSpaceCrafts}
          totalPages={totalPages}
        />
      </div>
    );
  }
};

export default Main;
