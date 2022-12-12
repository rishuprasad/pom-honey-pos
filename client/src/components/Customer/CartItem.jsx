import React from 'react'

// buttons
const CartItem = (props) => {
    const { item, index} = props;

    // styles
    const children = [item.protein_name, item.ingr1_name, item.ingr2_name, item.ingr3_name, item.ingr4_name, item.sauce_name];

    if (item.have_drink == 1) {
        children.push("drink");
    }

    return (
        <div className="mb-[20px]">
            <div className="flex font-bold text-xl justify-between items-center">
                <span>{item.dish_name}</span>
                <span className="text-red-500">${item.total_cost}</span>
            </div>
            <div className="text-right mt-[12px]">
                {children && children.map((citem, index) => (
                    <div className="text-left" key={citem + index}>{citem}</div>
                ))}
            </div>
        </div>
    )
}

export default CartItem