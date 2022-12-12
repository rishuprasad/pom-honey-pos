import React from 'react'

const ReportEntry = (props) => {
    const { item, type} = props;

    const baseClasses = 'flex rounded-[7px] justify-between shadow-md h-[50px] bg-gray-50 mb-[7px] transition-all hover:bg-gray-200 items-center px-[20px]'
    
    if (type == "sales") {
        return (
            <div className={baseClasses}>
                <span>{item.dish_name}</span>
                <span>{"$" + item.total_cost}</span>
            </div>
        )
    }

    if (type == "restock") {
        return (
            <div className={baseClasses}>
                <span>{item.ingredient_name}</span>
                <span>{item.stock}</span>
                <span>{item.restock}</span>
            </div>
        )
    }
    
    if (type == "excess") {
        return (
            <div className={baseClasses}>
                <span>{item.ingredient_name}</span>
                <span>{item.sold}</span>
            </div>
        )
    }

    if (type == "combo") {
        return (
            <div className={baseClasses}>
                <span>{item.c1Entry}</span>
                <span>{item.c2Entry}</span>
                <span>{item.sales}</span>
            </div>
        )
    }
    
}

export default ReportEntry