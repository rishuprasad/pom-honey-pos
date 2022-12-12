import React, { useState, useEffect } from 'react'
import Dish from '../Customer/Dish'
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

// Panels
const Starters = (props) => {
    const { currentDish, setCurrentDish } = props


    const [starters, setStarters] = useState([])

    const navigate = useNavigate(); //use navigate to jump

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


    const addStarter = async (item) => {    
        // BLOCK ANY INGREDIENTS --> NEED TO IMMEDIATELY ADD THE DISH INSTEAD OF CLICKING ANY TOPPINGS
        // JC : popup/green check at top on Customer 1 after pressing this (since we don't go to a new page, need feedback)
        message.success('A Combo Has Been Selected and Added To Cart');

        console.log("addStarter sends request");
        
        await fetch('https://pos-server-ls88.onrender.com/add_dish', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"dish_name": item.dish_name}),
        })

        console.log("addStarter got response");

        // JC : NAVIGATE BACK TO CUSTOMER 1 (or stay on the same page in this case)
        

        console.log("finalizeDish sends request");
        
    
        await fetch('https://pos-server-ls88.onrender.com/finalize')

        console.log("finalizeDish got response");
        navigate('/customer1')
        
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
        <Panel className="w-[48%]" title="Starter">
            {starters.map((item, index) => (
                <Dish key={"starter_" + item.dish_name} dish_name={item.dish_name} dish_price={item.dish_price} onClick={() => addStarter(item)} />
            ))}
        </Panel>
    )
}

export default Starters



