import React from 'react'

const MenuEntry = (props) => {
    const { item } = props;

    const baseClasses = 'flex rounded-[7px] justify-between shadow-md h-[50px] bg-gray-50 mb-[7px] transition-all hover:bg-gray-200 items-center px-[20px]'
    
    return (
        <div className={baseClasses}>
            <span>{item.dish_name}</span>
            <span>{"$" + item.dish_price}</span>
            <span>{item.dish_type}</span>
        </div>
    )    
}

export default MenuEntry