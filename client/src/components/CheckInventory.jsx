import React, { useState, useEffect } from 'react'
import Panel from './Panel2'
import Input from './Input'
import Button from './Button'
import Inventory from './Inventory'


const CheckInventory = () => {
    const initialInput = {"check_ingredient_name": ""}
    const [input, setInput] = useState(initialInput)
    const [inventory, setInventory] = useState([])

    const handleInputChange = event => {
        const { id, value } = event.target
        setInput({ ...input, [id]: value })
    }

    const getInventory = async (event) => {
        event.preventDefault();

        console.log("getInventory sends request");
        
        const response = await fetch(`https://pos-server-ls88.onrender.com/inventory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
        });
        response
            .json()
            .then(response => setInventory(response))
            .catch(e => console.log(e))
        
        console.log("getInventory gets response");
    }

    return (
        <Panel title="Check Inventory" className="mr-[25px] relative w-full md:w-[500px] h-full flex flex-col items-between">
                <div className="min-h-[60px] items-center flex w-full">
                    <Input id="check_ingredient_name" label="Item Name" handleInputChange={handleInputChange} value={input.check_ingredient_name}/>
                </div>
                <Button onClick={getInventory} className="mx-[5px]">Search</Button>
            <Inventory data={inventory}/>
        </Panel>
    )

}

export default CheckInventory