import React from 'react'

const InventoryEntry = (props) => {
    const { item } = props;

    const baseClasses = 'flex rounded-[7px] justify-between shadow-md h-[50px] bg-gray-50 mb-[7px] transition-all hover:bg-gray-200 items-center px-[20px]'
    
    return (
        <div className={baseClasses}>
            <span>{item.ingredient_name}</span>
            <span>{item.category}</span>
            <span>{item.stock}</span>
            <span>{item.location}</span>
        </div>
    )    
}

export default InventoryEntry