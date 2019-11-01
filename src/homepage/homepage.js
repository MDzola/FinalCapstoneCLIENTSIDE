
import React, { useEffect, useState } from "react";
import SpareItemList from "../spareitem/spareitemlist"

const HomePage = props => {
   const [spareitems, setSpareitems] = useState([]);

   const getSpareItems = () => {
    fetch("http://localhost:8000/spareitems", {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(setSpareitems);
  }

  useEffect(() => {
    getSpareItems()}, [])

  return (
    <>
      <main className="explorer">
        <h1>Welcome to Wheres My Spares</h1>
        <h4><SpareItemList {...props} spareitems={spareitems} /></h4>
      </main>
    </>
  );
};

export default HomePage;
