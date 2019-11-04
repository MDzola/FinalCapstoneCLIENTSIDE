import React, { useEffect, useState } from "react";
import useSimpleAuth from "../hooks/ui/useSimpleAuth"
import { Link } from "react-router-dom"

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
                            <div className="card text-center" style={{width: '35em'}}>
                            <div className="card-body">
                            <div key={spareItemDetail.id}>
                            <h3 className="card-title">{spareItemDetail.name}</h3>
                            <h5 className="card-text">Product Description: {spareItemDetail.description}</h5>
                            <li className="card-text">Quantity Available: {spareItemDetail.quantity} </li>
                            {/* <li className="card-text">Category: {spareItemDetail.category} </li> */}
                            </div>
                            <br></br>
                            {isAuthenticated() ?
                            <button className="btn btn-primary"
                                onClick={() => addToOrder(spareItemDetail)}> Add to Requisition Order </button>
                                : null
                            }
                             <br></br>
                             <br></br>
                            <Link className="nav-link" to={`./${spareItemDetail.id}/edit`}>
                                     <h5>Adjust Spare Item Quantity</h5>
                            </Link>
                            </div>
                            </div>
                            </>
            </section>
        </>
    )
}

export default SpareItemDetails
