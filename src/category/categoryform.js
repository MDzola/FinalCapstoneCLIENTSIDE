import React, { useRef } from "react"
import useSimpleAuth from "../hooks/ui/useSimpleAuth"

const NewCategoryForm = props => {
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
                props.history.push("/mysettings")
        }
    }

  return (
    <>
      <h1>Create a Payment Option</h1>
      <form className="categoryList" onSubmit={
        createNewCategory
      }>
        <fieldset>
          <label htmlFor="category_name">Category Name:</label>
          <input type="text" ref={category_name} name="category_name" required></input>
        </fieldset>
        <button type="submit">Add New Category</button>
      </form>
    </>
  )
}

export default NewCategoryForm

