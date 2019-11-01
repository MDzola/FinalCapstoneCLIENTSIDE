import React from "react"
import { Route } from "react-router-dom"
import NavBar from "./nav/navbar"
import ApplicationViews from "./ApplicationViews"

const WheresMySparesProject = () => {
    return (
        <React.Fragment>
            <Route render={props => (
                <NavBar {...props} />
            )} />
            <ApplicationViews />
        </React.Fragment>
    )
}

export default WheresMySparesProject
