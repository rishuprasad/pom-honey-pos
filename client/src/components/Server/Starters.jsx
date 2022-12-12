import React, { useState, useEffect } from 'react'
import Dish from '../Server/Dish'

// Panels
const Starters = (props) => {
    const { currentDish, setCurrentDish } = props


    const [starters, setStarters] = useState([])

    useEffect(() => {
        fetchStarters();
    }, [])

    const fetchStarters = async () => {
        const result = await fetch(`https://pos-server-ls88.onrender.com/starters`)
        result
            .json()
            .then(result => setStarters(result))
            .catch(e => console.log(e))
    }

    

    const addStarter = (item) => {
        // BLOCK ANY INGREDIENTS --> NEED TO IMMEDIATELY ADD THE DISH INSTEAD OF CLICKING ANY TOPPINGS
        // ALSO CREATE NEW COMPONENT WITHOUT ANY CHILDREN, JUST THE NAME OF THE DISH AND THE PRICE
        console.log("dish_name, dish_price");
        setCurrentDish({ ...currentDish, ["dish_name"]: item.dish_name, ["total_cost"]: item.dish_price });
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
        <Panel className="h-[48%]" title="Starter">
            {starters.map((item, index) => (
                <Dish key={"starter_" + item.dish_name} dish_name={item.dish_name} dish_price={item.dish_price} onClick={() => addStarter(item)} />
            ))}
        </Panel>
    )
}

export default Starters



