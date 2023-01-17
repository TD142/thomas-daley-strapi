import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL } from "../../utils/Api";
const Main = () => {
  const [spaceCrafts, setSpaceCrafts] = useState({});

  const getData = async () => {
    const { data } = await axios.get(API_URL);

    setSpaceCrafts(data.spacecrafts);
  };

  useEffect(() => {
    getData();
  }, []);

  if (!spaceCrafts) {
    return <p>...loading</p>;
  }
  console.log(spaceCrafts);
  return <div></div>;
};

export default Main;
