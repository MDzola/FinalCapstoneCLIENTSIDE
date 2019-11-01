import React from "react"
import SpareItem from "./spareitem"

const SpareItemList = props => {
    return (
        <>
                <ol>
            <article className="spareitemlist">
                {
                    props.spareitems.slice(-20).sort((a, b) => {return b.id - a.id}).map(spareitem =>
                        <SpareItem key={spareitem.id}
                            spareitem={spareitem} {...props} />)
                }
            </article>
                </ol>
        </>
    )
}

export default SpareItemList
