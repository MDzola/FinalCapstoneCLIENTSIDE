import React, { useState, useEffect, useRef } from "react"


const SpareItemEditForm = props => {
    const [spareItem, setSpareItem] = useState({ user: {} })
    const quantity = useRef();

    const getSpareItem =()=> {
        fetch(`http://localhost:8000/spareitems/${+props.match.params.spareitemId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          }
        })
          .then(res => res.json())
          .then(setSpareItem);
    }

    const updateSpareItem = (e) => {
        e.preventDefault()
        fetch(`http://localhost:8000/spareitems/${+props.match.params.spareitemId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("wheresmyspares_token")}`
          },
          "body": JSON.stringify({
            "quantity": quantity.current.value,
            })
        })
        .then(() => {
            console.log("Hello you are about to push to home page")
            props.history.push("/")
            })
    };

    useEffect(getSpareItem, [])
    console.log(spareItem)

  return (
    <>
      <h1>Adjust Spare Item Inventory</h1>
      <form className="categoryList" onSubmit={
        updateSpareItem
      }>
        <fieldset>
          <label htmlFor="quantity">Inventory Quantity:</label>
          <input type="text"  name="quantity" ref={quantity} defaultValue={spareItem.quantity} required></input>
        </fieldset>
        <button type="submit">Update Inventory Quantity</button>
      </form>
    </>
  )
}

export default SpareItemEditForm