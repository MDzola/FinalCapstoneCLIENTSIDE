import React from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

const NavBar = props => {
    const { isAuthenticated, logout } = useSimpleAuth()

    return (
        <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Wheres My Spares</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/types">Spare-Part Category</Link>
                </li>
                {isAuthenticated() ?
                <li className="nav-item">
                    <Link className="nav-link" to="/productform">Item Requisition Form</Link>
                </li> : null
                }
                {isAuthenticated() ?
                <li className="nav-item">
                    <Link className="nav-link" to="/MyProducts">Equipment Category</Link>
                </li> : null
                }
                {isAuthenticated() ?
                <li className="nav-item">
                    <Link className="nav-link" to="/mysettings">My Profile</Link>
                </li> : null
                }
                {isAuthenticated() ?
                <li className="nav-item">
                    <Link className="nav-link" to="/mysettings">Create Item Form</Link>
                </li> : null
                }
                {isAuthenticated() ?
                <li className="nav-item">
                    <Link className="nav-link" to="/mycart">Update Inventory Form</Link>
                </li> : null
                }

                {
                    isAuthenticated() ?
                        <li className="nav-item">
                            <button className="nav-link fakeLink"
                                onClick={() => {
                                    logout()
                                    props.history.push({
                                        pathname: "/"
                                    })
                                }
                                }
                            >Logout</button>
                        </li> :
                        <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                        </>
                }
            </ul>
        </nav>
    )
}

export default NavBar
