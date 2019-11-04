import React, { useEffect, useState, useRef } from "react";
import SpareItemList from "../spareitem/spareitemlist"

const Search = props => {
   const [spareitems, setSpareitems] = useState([]);
   const search = useRef()

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

  const filterSpareItemsByName = (name) => {
    fetch(`http://localhost:8000/spareitems?name=${name}`, {
      method: "Get",
      headers: {
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(setSpareitems)
  }



  useEffect(() => {
    getSpareItems()}, [])

    const SubmitSearch = e => {
        e.preventDefault()
        filterSpareItemsByName(search.current.value)

      }

    const refresh = (e) => {
        e.preventDefault()
        getSpareItems()
      }

  return (
    <>
      <main className="explorer">
      <label name="spareitem">Search Spare Item by Name</label>
        <br></br>
        <form onSubmit={SubmitSearch}>
          <input placeholder="ex: Slicing Knife" name="name" defaultValue="" ref={search} type="text">
          </input>
          <button type='submit'>Submit</button>
        </form>
          <a href="" onClick={refresh}>Reset</a>
        <h4><SpareItemList {...props} spareitems={spareitems} /></h4>
      </main>
    </>
  );
};

export default Search;
