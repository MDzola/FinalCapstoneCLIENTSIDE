import { Route } from "react-router-dom"
import React from 'react'
import { withRouter } from "react-router-dom"
import Register from "./auth/Register"
import Login from "./auth/Login"
import HomePage from "./homepage/homepage"
import NewCategoryForm from "./category/categoryform"
import SpareItemForm from "./spareitem/spareitemform"
import SpareItemDetails from "./spareitem/spareitemdetails"
import RequisitionOrder from "./order/requisitionorder"
import SpareItemEditForm from "./spareitem/spareitemeditform"
import InventoryManagement from "./inventorymanagement/inventorymanagement"
import SpareItemCategoryDetails from "./category/spareitemcategorydetails"


const ApplicationViews = () => {


    return (
        <React.Fragment>

            <Route
                exact path="/" render={props => {
                    return <HomePage {...props} />
                }}
            />

            <Route
                path="/register" render={props => {
                    return <Register {...props} />
                }}
            />

            <Route
                path="/login" render={props => {
                    return <Login {...props} />
                }}
            />

            <Route exact path="/spareitems/:spareitemId(\d+)" render={(props) => {
                return <SpareItemDetails {...props} />
            }}
            />

            <Route exact path="/spareitems/:spareitemId(\d+)/edit" render={(props) => {
                return <SpareItemEditForm {...props} />
            }}
            />

            <Route
                path="/spareitemform" render={props => {
                    return <SpareItemForm {...props} />
                }}
            />

            <Route
                path="/itemcategoryform" render={props => {
                    return <NewCategoryForm {...props} />
                }}
            />

                <Route
                path="/spareitemcategory/:spareitemcategoryId(\d+)" render={props => {
                    return <SpareItemCategoryDetails {...props} />
                }}
            />


            <Route exact path="/requisitionorder" render={props => {
                return <RequisitionOrder {...props} />
            }}
            />

            <Route exact path="/inventorymanagement" render={props => {
                return <InventoryManagement {...props} />
            }}
            />




        </React.Fragment>
    )
}

export default withRouter(ApplicationViews)
