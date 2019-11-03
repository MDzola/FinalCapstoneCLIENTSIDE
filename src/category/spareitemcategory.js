import React from "react"
import { Link } from "react-router-dom"

const SpareItemCategory = props => {

    return (
        <>
            <section className="spareitemcategory">
            <Link className="nav-link" to={`/spareitemcategory/${props.spareitemcategory.id}`}>{props.spareitemcategory.name}</Link>
            </section>
        </>
    )
}


export default SpareItemCategory
