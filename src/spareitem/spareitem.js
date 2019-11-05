import React from "react"
import { Link } from "react-router-dom"

const SpareItem = props => {

    return (
        <>
            <section className="spareitem">
            <Link className="nav-link" to={`/spareitems/${props.spareitem.id}`}>{props.spareitem.name} -- QNTY:{props.spareitem.quantity}</Link>
            </section>
        </>
    )
}


export default SpareItem
