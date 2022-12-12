import React, { useState, useEffect } from 'react'
import Panel from './Panel2'
import Input from './Input'
import Button from './Button'


const ChangeMenu = () => {
    const initialDish = {"dish_name": "", "dish_price": ""}
    const [dish, setDish] = useState(initialDish)



    const handleInputChange = event => {
        const { id, value } = event.target
        setDish({ ...dish, [id]: value })
    }

    const addDish = async (event) => {
        event.preventDefault();

        console.log("addDish sends requests");
        
        await fetch(`https://pos-server-ls88.onrender.com/add_new_dish`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dish),
        });
        await fetch(`https://pos-server-ls88.onrender.com/add_new_inventory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dish),
        });

        setDish(initialDish);
        
        console.log("addDish gets responses");
    }

    const updateDish = async (event) => {
        event.preventDefault();

        console.log("updateDish sends request");
        
        await fetch(`https://pos-server-ls88.onrender.com/update_dish`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dish),
        });

        setDish(initialDish);
        
        console.log("updateDish gets response");
    }

    const removeDish = async (event) => {
        event.preventDefault();

        console.log("removeDish sends request");
        
        await fetch(`https://pos-server-ls88.onrender.com/remove_dish`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dish),
        });

        setDish(initialDish);
        
        console.log("removeDish gets response");
    }

    return (
        <Panel className="h-[48%]" title="Change Menu">
            <div className="mt-[20px]">
                <Input id="dish_name" label="Name" handleInputChange={handleInputChange} value={dish.dish_name} />
                <Input id="dish_price" label="Price" handleInputChange={handleInputChange} value={dish.dish_price} />
            </div>
            <div className="flex justify-between">
                <Button onClick={removeDish} type="danger">Remove Dish</Button>
                <Button onClick={updateDish} type="warning">Update Price</Button>
                <Button onClick={addDish}>Add Dish</Button>
            </div>
        </Panel>
    )

}

export default ChangeMenu