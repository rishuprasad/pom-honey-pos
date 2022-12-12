import React, { useState, useEffect } from 'react'
import Panel from './Panel2'
import Input from './Input'
import Button from './Button'


const RecordRestock = () => {
    const initialRestock = {"time": "", "ingredient_name": "", "seller_name": "", "cost": "", "num_servings": ""}
    const [restock, setRestock] = useState(initialRestock)


    const handleInputChange = event => {
        const { id, value } = event.target
        setRestock({ ...restock, [id]: value })
    }

    const addRestockOrder = async (event) => {
        event.preventDefault();

        console.log("addRestockOrder sends requests");

        // updateRestockTime();
        
        await fetch(`https://pos-server-ls88.onrender.com/restock`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(restock),
        });

        await fetch(`https://pos-server-ls88.onrender.com/update_inventory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(restock),
        });

        setRestock(initialRestock);
        
        console.log("addRestockOrder gets responses");
    }

    return (
        <Panel className="h-[48%]" title="Record Restock Orders">
            <div className="mt-[20px]">
                <Input id="ingredient_name" label="Ingredient Name" handleInputChange={handleInputChange} value={restock.ingredient_name}/>
                <Input id="num_servings" label="Quantity (servings)" handleInputChange={handleInputChange} value={restock.num_servings}/>
                <Input id="cost" label="Cost" handleInputChange={handleInputChange} value={restock.cost}/>
                <Input id="seller_name" label="Seller" handleInputChange={handleInputChange} value={restock.seller_name}/>
                <Input id="time" label="Datetime Received" handleInputChange={handleInputChange} value={restock.time}/>
            </div>
            <Button onClick={addRestockOrder}>Record Restock Order</Button>
        </Panel>
    )

}

export default RecordRestock