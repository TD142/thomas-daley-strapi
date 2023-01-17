import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL } from "../../utils/Api";
const Main = () => {
  const [spaceCrafts, setSpaceCrafts] = useState(null);

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
        <div className="Spacecrafts">
          {spaceCrafts.map((spaceCraft) => {
            return (
              <div key={spaceCraft.uid}>
                <p>Name: {spaceCraft.name}</p>
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
