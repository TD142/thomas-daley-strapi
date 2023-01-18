import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL } from "../../utils/Api";
import Paginate from "./Paginate/Paginate";
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

  useEffect(() => {
    getData();
  }, []);

  if (!spaceCrafts) {
    return <p>...loading</p>;
  } else {
    return (
      <div className="main">
        <div className="container">
          <label htmlFor="search">Search</label>
          <input
            value={searchValue}
            onChange={(event) => {
              setCurrentPage(1);
              setSearchValue(event.target.value);
            }}
            id="search"
            name="search"
            type="text"
          />
          {!currentSpaceCrafts.length ? (
            <p>No search matches!</p>
          ) : (
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
