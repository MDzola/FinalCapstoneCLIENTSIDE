import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"

const InventoryManagement = props => {

  return (
    <>
      <main className="explorer">
        <h1>Inventory Management</h1>
        <Link className="nav-link" to={`/spareitemform`}>
                <h5>Create a New Spare-Item</h5>
        </Link>
        <Link className="nav-link" to={`/itemcategoryform`}>
                    <h5>Create a New Spare-Item Category</h5>
        </Link>
      </main>
    </>
  );
};

export default InventoryManagement;
