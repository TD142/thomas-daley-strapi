import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL } from "../../utils/Api";
import Paginate from "./Paginate/Paginate";
import "./Main.scss";
const Main = () => {
  const [spaceCrafts, setSpaceCrafts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  const searchedSpaceCrafts = spaceCrafts.filter((spaceCrafts) =>
    spaceCrafts.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentSpaceCrafts = searchedSpaceCrafts.slice(
    firstPostIndex,
    lastPostIndex
  );

  const totalPages = Math.ceil(searchedSpaceCrafts.length / postsPerPage);

  const getData = async () => {
    const { data } = await axios.get(API_URL);

    setSpaceCrafts(data.spacecrafts);
  };

  const handleInputChange = (event) => {
    setCurrentPage(1);
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    getData();
  }, []);

  if (!spaceCrafts.length) {
    return <p>...loading</p>;
  } else {
    return (
      <div className="main">
        <div className="main__container">
          <div className="main__wrapper">
            <h2 className="main__wrapper__title">SPACECRAFTS</h2>
            <div className="search">
              {/* <label htmlFor="search">Search</label> */}
              <input
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
                <div className="spacecrafts" key={spaceCraft.uid}>
                  {spaceCraft.name && <p>Name: {spaceCraft.name}</p>}
                  {spaceCraft.registry && (
                    <p>Registry: {spaceCraft.registry}</p>
                  )}
                  {spaceCraft.status && <p>Status: {spaceCraft.status}</p>}
                  {spaceCraft.dateStatus && (
                    <p>dateStatus: {spaceCraft.dateStatus}</p>
                  )}

                  {spaceCraft.spacecraftClass && (
                    <p>spacecraftClass: {spaceCraft.spacecraftClass.name}</p>
                  )}

                  {spaceCraft.owner && <p>Owner: {spaceCraft.owner.name}</p>}
                  {spaceCraft.operator && (
                    <p>Owner: {spaceCraft.operator.name}</p>
                  )}
                </div>
              );
            })
          ) : (
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
