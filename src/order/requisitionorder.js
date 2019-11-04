import React, { useState, useEffect, useRef } from "react";

const RequisitionOrder = props => {
  const [spareItems, setSpareItems] = useState([]);
  const payment = useRef();

  const getOpenOrder = () => {
    fetch(`http://localhost:8000/requisitionorders/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("wheresmyspares_token")}`
      }
    })
      .then(response => {
        return response.json();
      })

      .then((response) => {
        if("message" in response === true){
          alert("Please add a product to begin a cart")
          props.history.push("/")
        }
        else{
          console.log("response", response)
      setSpareItems(response)};
  });
}

  const deleteItem = spareItem => {
    fetch(`http://localhost:8000/requisitionorders/cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("wheresmyspares_token")}`
      },
      body: JSON.stringify({
        "spareItem_id": spareItem
      })
    }).then(() => {
      getOpenOrder()
    });
  };

  const completeOrder = () => {
    fetch(`http://localhost:8000/requisitionorders/cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("wheresmyspares_token")}`
      },
      body: JSON.stringify({
        "is_complete": ""
      })
    })
    .then(() => {
      props.history.push("/")
    })
  };

  const cancelOrder = () => {
    console.log("delete works")
    fetch(`http://localhost:8000/requisitionorders/cart`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("wheresmyspares_token")}`
      }
    }).then(() => {
      alert("Your Order has been canceled")
      props.history.push("/")
    });
  };

  useEffect(() => {
    getOpenOrder();
  }, []);

  return (
    <>
      <main className="order-items">
        <h2>Spare Item Requisition Order</h2>
        <ul>
          {spareItems.map(item => {
            return (
              <li key={item.id}>
                {item.name}: quantity in stock: {item.quantity}
                <button
                className="btn btn-warning"
                  onClick={() => {
                    deleteItem(item.id);
                  }}
                >
                  Remove Item
                </button>
              </li>
            );
          })}
        </ul>
        <button
          className="btn btn-success"
          onClick={() => completeOrder()}
        >
          {" "}
          Complete Order{" "}
        </button>
        <br></br>
        <br></br>
        <button className="btn btn-danger" onClick={cancelOrder}>Cancel Order</button>
      </main>
    </>
  );
};

export default RequisitionOrder;

