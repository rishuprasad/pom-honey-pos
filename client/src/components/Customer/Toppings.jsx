import React, { useState, useEffect } from 'react'
import Ingredient from '../Customer/Ingredient'

// Panels
const Toppings = (props) => {
    const { addIngredient } = props

    const [toppings,setToppings] = useState([])

    useEffect(() => {
        fetchToppings();
    }, [])

    const fetchToppings = async () => {
        const result = await fetch(`https://pos-server-ls88.onrender.com/toppings`)
        result
            .json()
            .then(result => setToppings(result))
            .catch(e => console.log(e))
    }

    const Panel = ({ children, title, className }) => {
        return (
            <div className={'bg-white overflow-auto rounded-[15px] shadow-lg p-[5px] md:p-[20px] ' + className}>
                <p className="mb-[10px] pb-[12px] border-gray-500 border-b-1 text-left text-xl font-bold text-blue-500">{title}</p>
                {children}
            </div>
        )
    }


    return (
        <Panel className="w-[48%] h-full" title="Toppings">
            <div className="flex w-[100%] overflow-auto">
            {
                toppings.map((item, index) => (
                    <Ingredient key={"topping_" + item.ingredient_name} label={item.ingredient_name} onClick={() => addIngredient(item, "topping")} />
                ))
            }
            </div>
        </Panel>
    )
}

export default Toppings



