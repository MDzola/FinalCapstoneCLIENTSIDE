import React, { useEffect, useState, useRef } from "react";
import useModal from "../hooks/ui/useModal"

const SpareItemForm = props => {
  const name = useRef();
  const description = useRef();
  const quantity = useRef();
  const critical_quantity = useRef();
  const category_id = useRef();


  const [categoryList, setCategoryList] = useState([]);
  const { toggleDialog, modalIsOpen } = useModal("#category_alert");

  const handleCreate = e => {
    e.preventDefault();

    const newSpareItem = {
      name: name.current.value,
      description: description.current.value,
      quantity: parseInt(quantity.current.value),
      critical_quantity: parseInt(critical_quantity.current.value),
      itemcategory_id: parseInt(category_id.current.value),
    };
    if (category_id.current.value === "") {
        toggleDialog(true);
      } else {
        createSpareItem(newSpareItem).then(() => {
          props.history.push({
            pathname: "/"
          });
      });
    }
  };

  const getCategories = () => {
    // Fetch the data from localhost:8000/itemcategories
    fetch("http://localhost:8000/itemcategories", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("wheresmyspares_token")}`
      }
    })
      //   Convert to JSON
      .then(response => response.json())
      //   Store itinerary items in state variable
      .then(categoryList => {
        setCategoryList(categoryList);
      });
  };

  const createSpareItem = (newSpareItem) => {
    return fetch("http://localhost:8000/spareitems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("wheresmyspares_token")}`
      },
      body: JSON.stringify(newSpareItem)
    }).then(res => res.json());
  };


  useEffect(() => {
    getCategories();

    const handler = e => {
      if (e.keyCode === 27) {
        if (modalIsOpen) {
          toggleDialog(false);
        }
      }
    };

    window.addEventListener("keyup", handler);

    return () => window.removeEventListener("keyup", handler);
  }, []);



  // Create HTML representation with JSX
  return (
    <>
      {/* Dialog Box */}
      <dialog id="category_alert" className="category_alert">
        <br />
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
        <p>Please Select a Category for the Product.</p>
        <button onClick={() => toggleDialog(false)}>Ok</button>
        </div>
        <button
          style={{
            position: "absolute",
            top: "0.25em",
            right: "0.25em"
          }}
          id="closeBtn"
          onClick={() => toggleDialog(false)}
        >
          X
        </button>
      </dialog>
      {/* Add Product Form */}
      <main style={{ textAlign: "center" }}>
        <form className="form--login" onSubmit={handleCreate}>
          <h1 className="h3 mb-3 font-weight-normal">Create a New Spare Item</h1>
          <fieldset>
            <label htmlFor="name"> Product Name </label>
            <input
              ref={name}
              type="text"
              name="name"
              className="form-control"
              placeholder="Product Name"
              required
              autoFocus
            />
          </fieldset>
          <br></br>
          <fieldset>
            <label htmlFor="description"> Description </label>
            <br />
            <textarea
              ref={description}
              placeholder="Product Description"
            ></textarea>

          </fieldset>
          <fieldset>
            <label htmlFor="quantity"> Quantity </label>
            <input
              ref={quantity}
              type="number"
              name="quantity"
              className="form-control"
              placeholder="Quantity Available"
              required
            />
          </fieldset>
          <br></br>
          <fieldset>
            <label htmlFor="critical_quantity">Critical Quantity: Alerts at this number </label>
            <input
              ref={critical_quantity}
              type="number"
              name="critical_quantity"
              className="form-control"
              placeholder="Quantity Available"
              required
            />
          </fieldset>
          <br></br>
          <fieldset>
            <label htmlFor="category"> Category: </label>
            <select className="selectpicker btn-primary" ref={category_id}>
              <option value="">Select Category</option>
              {categoryList.map(category => {
                return <option key={category.id} value={category.id}>{category.name}</option>;
              })}
            </select>
          </fieldset>
          <br></br>
          <fieldset>
            <button className="btn btn-success" type="submit">Submit</button>
          </fieldset>
        </form>
      </main>
    </>
  );
};

export default SpareItemForm;