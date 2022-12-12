import React, { useState, useEffect } from 'react'
import Ingredient from '../Server/Ingredient'

// Panels
const Proteins = (props) => {


    const { addIngredient } = props

    const [proteins,setProteins] = useState([])

    useEffect(() => {
        fetchProteins();
    }, [])


    const fetchProteins = async () => {
        const result = await fetch(`https://pos-server-ls88.onrender.com/proteins`)
        result
            .json()
            .then(result => setProteins(result))
            .catch(e => console.log(e))
    }

    var title = "";

    const Panel = ({ children, title, className }) => {
        return (
            <div className={'bg-white overflow-auto rounded-[15px] shadow-lg p-[5px] md:p-[20px] ' + className}>
                <p className="mb-[10px] pb-[12px] border-gray-500 border-b-1 text-left text-xl font-bold text-blue-500">{title}</p>
                {children}
            </div>
        )
    }

    

    return (
        <Panel className="h-[48%]" title={"Proteins"} >
            {
                proteins.map((item, index) => (
                    <Ingredient key={"protein_" + item.ingredient_name} label={item.ingredient_name} onClick={() => addIngredient(item, "protein")} />
                ))
            }
        </Panel>
    )
}

export default Proteins



