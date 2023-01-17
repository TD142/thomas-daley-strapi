import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL } from "../../utils/Api";
const Main = () => {
  const [spaceCrafts, setSpaceCrafts] = useState(null);
  const [searchValue, setSearchValue] = useState("");

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
    const searchedSpaceCrafts = spaceCrafts.filter((spaceCrafts) =>
      spaceCrafts.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (
      <div className="main">
        <div className="container">
          <label htmlFor="search">Search</label>
          <input
            value={searchValue}
            onChange={(event) => {
              setSearchValue(event.target.value);
            }}
            id="search"
            name="search"
            type="text"
          />
          {searchedSpaceCrafts.map((spaceCraft) => {
            return (
              <div className="spacecrafts" key={spaceCraft.uid}>
                <div className=""></div>
                {spaceCraft.name && <p>Name: {spaceCraft.name}</p>}
                {spaceCraft.registry && <p>Registry: {spaceCraft.registry}</p>}
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
          })}
        </div>
      </div>
    );
  }
};

export default Main;
