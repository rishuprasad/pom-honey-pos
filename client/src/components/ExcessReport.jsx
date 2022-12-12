import React, { useState, useEffect } from 'react'
import Panel from '../components/Panel2'
import Input from '../components/Input'
import Button from '../components/Button'
import ReportEntries from './ReportEntries'


const ExcessReport = () => {
    const initialInput = {"e_start_date": ""}
    const [input, setInput] = useState(initialInput)

    const initialExcessReport = []
    const [excessReport, setExcessReport] = useState([])

    const START = "2022-09-11 00:00:00"

    const handleInputChange = event => {
        const { id, value } = event.target
        setInput({ ...input, [id]: value })
    }

    const getExcessReport = async (event) => {
        for (let i = 0; excessReport.length; i++) { excessReport.pop(); }
        setExcessReport(excessReport);

        console.log("getExcessReport sends requests");        

        const response = await fetch(`https://pos-server-ls88.onrender.com/ingredients`)
        response
            .json()
            .then(response => processIngredients(response))
            .catch(e => console.log(e))
        
        console.log("getExcessReport gets responses");
    }

    const processIngredients = (ingredients) => {
        ingredients.forEach(ingredient => {
            if (ingredient.category == 'topping' || ingredient.category == 'protein' || ingredient.category == 'sauce') {
                getSales(ingredient);
            }
        });
    }

    const getSales = async (ingredient) => {
        if (ingredient.category == "topping") {
            getSales1(ingredient);
        }

        if (ingredient.category == 'protein') {
            const response = await fetch(`https://pos-server-ls88.onrender.com/sales_protein`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ingredient),
            });
            response
                .json()
                .then((response) => getRestocks(response[0].count, ingredient))
                .catch(e => console.log(e))
        }

        if (ingredient.category == 'sauce') {
            const response = await fetch(`https://pos-server-ls88.onrender.com/sales_sauce`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ingredient),
            });
            response
                .json()
                .then((response) => getRestocks(response[0].count, ingredient))
                .catch(e => console.log(e))
        }
    }

    //

    const getSales1 = async (ingredient) => {
        const response = await fetch(`https://pos-server-ls88.onrender.com/sales_ingr1`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ingredient),
        });
        response
            .json()
            .then((response) => getSales2(response[0].count, ingredient))
            .catch(e => console.log(e))
    }

    //

    const getSales2 = async (sales, ingredient) => {
        const response = await fetch(`https://pos-server-ls88.onrender.com/sales_ingr2`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ingredient),
        });
        response
            .json()
            .then((response) => getSales3(sales + response[0].count, ingredient))
            .catch(e => console.log(e))
    }

    //

    const getSales3 = async (sales, ingredient) => {
        const response = await fetch(`https://pos-server-ls88.onrender.com/sales_ingr3`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ingredient),
        });
        response
            .json()
            .then((response) => getSales4(sales + response[0].count, ingredient))
            .catch(e => console.log(e))
    }

    //

    const getSales4 = async (sales, ingredient) => {
        const response = await fetch(`https://pos-server-ls88.onrender.com/sales_ingr4`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ingredient),
        });
        response
            .json()
            .then((response) => getRestocks(sales + response[0].count, ingredient))
            .catch(e => console.log(e))
    }

    // currStock = initialStock - sales + restocks
    // initialStock = currStock + sales - restocks 

    const getRestocks = async (sales, ingredient) => {
        if (input.e_start_date == "") {
            input.e_start_date = START;
            ingredient.start_date = START;
        }
        else {
            ingredient.start_date = input.e_start_date;
        }        
        const response = await fetch(`https://pos-server-ls88.onrender.com/restocks_after`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ingredient),
        });
        
        response
            .json()
            .then((response => isExcess(response[0].sum, sales, ingredient)))
    }

    const isExcess = (restocks, sales, ingredient) => {
        let initialStock = 0
        if (restocks === null) {
            initialStock = ingredient.stock + sales;
        }
        else {
            initialStock = ingredient.stock + sales - restocks;
        }
        
        if (sales < 0.10 * initialStock) {
            // console.log(ingredient.ingredient_name + " " + initialStock)
            let percent = sales / initialStock * 100;
            // console.log("Sold " + percent.toFixed(3) + "%")
            ingredient.sold_dbl = percent.toFixed(3)
            ingredient.sold = ingredient.sold_dbl + "%"
            excessReport.push(ingredient)
            setExcessReport([...excessReport])
        }

        sortExcessReport()
    }

    const sortExcessReport = () => {
        excessReport.sort( (entry1, entry2) => 
            entry2.sold_dbl - entry1.sold_dbl
        )
        setExcessReport([...excessReport])
        
    }

    return (
        <Panel className="h-[48%]" title="Excess Inventory Report">
            <div>
                <div className="mt-[20px]">
                    <Input id="e_start_date" label="Input Type of Dish" handleInputChange={handleInputChange} value={input.e_start_date}/>
                </div>
                <Button onClick={getExcessReport}>Generate Excess Report</Button>
            </div>
            <ReportEntries data={excessReport} type="excess" />  
        </Panel>
    )
}

export default ExcessReport