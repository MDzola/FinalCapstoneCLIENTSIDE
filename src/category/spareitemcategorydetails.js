import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import SpareItemList from "../spareitem/spareitemlist"

const SpareItemCategoryDetails = props => {
  const [spareitemcategorydetails, setSpareItemCategoryDetail] = useState([]);
  const [spareitems, setSpareItems] = useState([]);

    const getSpareItemCategory =()=> {
        fetch(`http://localhost:8000/itemcategories/${+props.match.params.spareitemcategoryId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          }
        })
          .then(res => res.json())
          .then(setSpareItemCategoryDetail);
    }

    const getSpareItemsFromCategory =()=> {
      fetch(`http://localhost:8000/spareitems?category=${+props.match.params.spareitemcategoryId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        }
      })
        .then(res => res.json())
        .then(setSpareItems);
  }



    useEffect(() => {
      getSpareItemCategory();
      getSpareItemsFromCategory();
      }, []);


    return (
        <>
            <section className="SpareItemCategoryDetails">
                            <>
                            <div  key={spareitemcategorydetails.id}>
                            <h2>Category Name: {spareitemcategorydetails.name}</h2>
                            <Link className="nav-link" to={`./${spareitemcategorydetails.id}/edit`}>
                                     <h5>Edit Category</h5>
                            </Link>
                            </div>
                            <br></br>
                            <h4> Items in Category </h4>
                            <div>
                            <h4><SpareItemList {...props} spareitems={spareitems} /></h4>
                            </div>
                            </>
            </section>
        </>
    )
}

export default SpareItemCategoryDetails
