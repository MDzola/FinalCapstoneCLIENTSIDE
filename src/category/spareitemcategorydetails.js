import React, { useEffect, useState } from "react";
import useSimpleAuth from "../hooks/ui/useSimpleAuth"
import { Link } from "react-router-dom"

const SpareItemCategoryDetails = props => {
    const [spareitemcategorydetails, setSpareItemCategoryDetail] = useState([]);

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


    useEffect(() => {
        getSpareItemCategory()
      }, []);


    return (
        <>
            <section className="SpareItemCategoryDetails">
                            <>
                            <div  key={spareitemcategorydetails.id}>
                            <h3>Category Name: {spareitemcategorydetails.name}</h3>
                            <Link className="nav-link" to={`./${spareitemcategorydetails.id}/edit`}>
                                     <h5>Edit Category</h5>
                            </Link>
                            </div>
                            </>
            </section>
        </>
    )
}

export default SpareItemCategoryDetails
