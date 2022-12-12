import React, { useState, useEffect } from 'react'
import Panel from './Panel2'
import Input from './Input'
import Button from './Button'
import Menu from './Menu'


const SearchMenu = () => {
    const initialInput = {"menu_search_term": ""}
    const [input, setInput] = useState(initialInput)
    const [menu, setMenu] = useState([])


    const handleInputChange = (event) => {
        const { id, value } = event.target
        console.log("'" + id + "': '" + value + "'")
        setInput({ ...input, [id]: value })
    }

    const getMenu = async (event) => {
        event.preventDefault();

        console.log("getMenu sends request");
        
        const response = await fetch(`https://pos-server-ls88.onrender.com/menu`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
        });
        response
            .json()
            .then(response => setMenu(response))
            .catch(e => console.log(e))
        
        console.log("getMenu gets response");
    }

    return (
        <Panel title="Menu" className="mr-[25px] relative w-full md:w-[500px] h-full flex flex-col items-between">
                <div className="min-h-[60px] items-center flex w-full">
                    <Input id="menu_search_term" label="Dish Name" handleInputChange={handleInputChange} value={input.menu_search_term}/>
                </div>
                <Button onClick={getMenu} className="mx-[5px]">Search</Button>
            <Menu data={menu}/>
        </Panel>
    )

}

export default SearchMenu