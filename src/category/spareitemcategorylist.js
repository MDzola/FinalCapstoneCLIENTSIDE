import React from "react"
import SpareItemCategory from "./spareitemcategory"

const SpareItemCategoryList = props => {
    return (
        <>
                <ol>
            <article className="spareitemlist">
                {
                    props.spareitemcategories.map(spareitemcategory =>
                        <SpareItemCategory key={spareitemcategory.id}
                            spareitemcategory={spareitemcategory} {...props} />)
                }
            </article>
                </ol>
        </>
    )
}

export default SpareItemCategoryList
