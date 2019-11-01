import React, { useEffect, useState } from "react";
import useSimpleAuth from "../hooks/ui/useSimpleAuth"

const SpareItemDetails = props => {
    const { isAuthenticated } = useSimpleAuth()
    const [spareItemDetail, setSpareItemDetail] = useState([]);

    const getSpareItem =()=> {
        fetch(`http://localhost:8000/spareitems/${+props.match.params.spareitemId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          }
        })
          .then(res => res.json())
          .then(setSpareItemDetail);
    }


    useEffect(() => {
        getSpareItem()
      }, []);

    const addToOrder = (newOrder) => {
            fetch(`http://localhost:8000/requisitionorders`, {
                "method": "POST",
                headers :{
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Token ${localStorage.getItem("wheresmyspares_token")}`,
                },
                body: JSON.stringify(newOrder)
            })
                .then(response => response.json())
                .then(() => {
                    props.history.push("/")
                  })
        }


    return (
        <>
            <section className="SpareItemDetails">
                            <>
                            <div  key={spareItemDetail.id}>
                            <h3>Name of Product: {spareItemDetail.name}</h3>
                            <h3>Product Description: {spareItemDetail.description}</h3>
                            <h3>Quantity Available: {spareItemDetail.quantity} </h3>
                            {isAuthenticated() ?
                            <button className="fakeLink addToOrder__link"
                                onClick={() => addToOrder(spareItemDetail)}> Add to Requisition </button>
                                : null
                            }
                            </div>
                            </>
            </section>
        </>
    )
}

export default SpareItemDetails
