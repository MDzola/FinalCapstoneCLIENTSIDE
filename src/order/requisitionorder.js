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

  const deleteItem = productItem => {
    fetch(`http://localhost:8000/orders/cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("wheresmyspares_token")}`
      },
      body: JSON.stringify({
        "product_id": productItem
      })
    }).then(() => {
      getOpenOrder()
    });
  };

  const completeOrder = () => {
    if(payment.current.value === ""){
      alert("Please Select a Payment Type Fool!")
    }
    else{
    fetch(`http://localhost:8000/requisitionorders/cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("wheresmyspares_token")}`
      },
      body: JSON.stringify({
        "payment_id": payment.current.value
      })
    })
    .then(() => {
      props.history.push("/")
    })
  }};

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
        <h2>My Requisition Order</h2>
        <ul>
          {spareItems.map(item => {
            return (
              <li key={item.id}>
                {item.name}: quantity in stock: {item.quantity}
                <button
                  onClick={() => {
                    deleteItem(item.id);
                  }}
                >
                  remove
                </button>
              </li>
            );
          })}
        </ul>
        <button
          className="fakeLink addToOrder__link"
          onClick={() => completeOrder()}
        >
          {" "}
          Complete Order{" "}
        </button>
        <br></br>
        <button onClick={cancelOrder}>Cancel Order</button>
      </main>
    </>
  );
};

export default RequisitionOrder;

