
import React, { useEffect, useState } from "react";
import SpareItem from "./spareitem"

const CriticalQuantityParts = props => {
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
        <h2>List of Spare Items that are in Critical Quantity</h2>
       {
           spareitems.map(spareitem => {
               if(spareitem.quantity <= spareitem.critical_quantity){

                return<h4><SpareItem {...props} spareitem={spareitem} /></h4>
               }
           })
       }
      </main>
    </>
  );
};

export default CriticalQuantityParts;
