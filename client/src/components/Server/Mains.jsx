import React, { useState, useEffect } from 'react'
import Dish from '../Server/Dish'

// Panels
const Mains = (props) => {
    const { currentDish, setCurrentDish } = props

    const [mains,setMains] = useState([])

    useEffect(() => {
        fetchMains();
    }, [])

    const fetchMains = async () => {
        const result = await fetch(`https://pos-server-ls88.onrender.com/mains`)      // change to final deployment site
        result
            .json()
            .then(result => setMains(result))
            .catch(e => console.log(e))
    }

    const addMain = (item) => {
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
        <Panel className="h-[48%]" title="Main">
            {mains.map((item, index) => (
                <Dish key={"main_" + item.dish_name} dish_name={item.dish_name} dish_price={item.dish_price} onClick={() => addMain(item)} />
            ))}
        </Panel>
    )
}

export default Mains



