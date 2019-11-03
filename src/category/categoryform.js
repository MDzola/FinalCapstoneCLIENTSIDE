import React, { useEffect, useState, useRef } from "react";
import SpareItemCategoryList from "./spareitemcategorylist"
import useSimpleAuth from "../hooks/ui/useSimpleAuth"

const NewCategoryForm = props => {
  const [spareitemcategories, setSpareitemCategories] = useState([]);
    const category_name = useRef();
    const { isAuthenticated } = useSimpleAuth();

    const createNewCategory = e => {
        e.preventDefault();
            if(isAuthenticated){
            fetch(`http://localhost:8000/itemcategories`, {
                "method": "POST",
                "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("wheresmyspares_token")}`
                },
                "body": JSON.stringify({
                "category_name": category_name.current.value,
            })
            })
                .then(response => response.json())
                props.history.push("/inventorymanagement")
        }
    }


  const getSpareItemCategories = () => {
    fetch("http://localhost:8000/itemcategories", {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(setSpareitemCategories);
  }

  useEffect(() => {
    getSpareItemCategories();
  }, [])

  return (
    <>
      <h1>Create a new Spare-Item Category</h1>
      <form className="categoryList" onSubmit={
        createNewCategory
      }>
        <fieldset>
          <label htmlFor="category_name">Category Name:</label>
          <input type="text" ref={category_name} name="category_name" required></input>
        </fieldset>
        <button type="submit">Add New Category</button>
      </form>
      <>
      <br>
      </br>
      <br>
      </br>
      <div className="explorer">
        <h1>Current List of Item Categories</h1>
        <h4><SpareItemCategoryList {...props} spareitemcategories={spareitemcategories} /></h4>
      </div>
    </>
    </>

  )
}

export default NewCategoryForm

