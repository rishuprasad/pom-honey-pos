import React, { useState, useEffect } from 'react'
import Panel from '../components/Panel2'
import Input from '../components/Input'
import Button from '../components/Button'
import ReportEntries from './ReportEntries'


const ComboReport = () => {    
    const initialInputs = {"c_category1": "_", "c_category2": "_"}
    const [inputs, setInputs] = useState(initialInputs)

    const [comboReport, setComboReport] = useState([])

    const handleInputChange = event => {
        const { id, value } = event.target
        setInputs({ ...inputs, [id]: value })
    }

    //

    const getBestSellingComboReport = async (event) => {
        for (let i = 0; comboReport.length; i++) { comboReport.pop(); }
        setComboReport(comboReport);

        console.log("getBestSellingComboReport sends request");

        let url = "";
        switch (inputs.c_category1) {
            case "protein":
                url = `https://pos-server-ls88.onrender.com/proteins`;
                break;
            case "topping":
                url = `https://pos-server-ls88.onrender.com/toppings`;
                break;
            case "sauce":
                url = `https://pos-server-ls88.onrender.com/sauces`;
                break;
        }
        const result = await fetch(url)      // change to final deployment site
        result
            .json()
            .then(result => getCategory2Entries(result))
            .catch(e => console.log(e))

        console.log("getBestSellingComboReport sends request");
    }

    const getCategory2Entries = async (c1Entries) => {
        let url = "";
        switch (inputs.c_category2) {
            case "protein":
                url = `https://pos-server-ls88.onrender.com/proteins`;
                break;
            case "topping":
                url = `https://pos-server-ls88.onrender.com/toppings`;
                break;
            case "sauce":
                url = `https://pos-server-ls88.onrender.com/sauces`;
                break;
        }
        const result = await fetch(url)      // change to final deployment site
        result
            .json()
            .then(result => calcComboSales(c1Entries, result))
            .catch(e => console.log(e))
    }

    const calcComboSales = async (c1Entries, c2Entries) => {


        for (let i = 0; i < c1Entries.length; i++) {
            for (let j = 0; j < c2Entries.length; j++) {
                let c1Entry = c1Entries[i].ingredient_name
                let c2Entry = c2Entries[j].ingredient_name
                let c1Condition = makeCondition(inputs.c_category1, c1Entry)
                let c2Condition = makeCondition(inputs.c_category2, c2Entry)
                let input = {"c1Condition" : c1Condition, "c2Condition" : c2Condition}
                const response = await fetch(`https://pos-server-ls88.onrender.com/combo_sales`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(input),
                });
                response
                    .json()
                    // .then((response) => setComboReport([...response[0].sales]))
                    .then((response) => {
                        let reportEntry = {"c1Entry" : c1Entry, "c2Entry" : c2Entry, "sales" : response[0].sales}
                        comboReport.push(reportEntry)
                    })
                    .catch(e => console.log(e))
            }
        }
        setComboReport([...comboReport])
        
        sortComboReport()
    }

    const makeCondition = (category, cEntry) => {
        switch (category) {
            case "protein":
                return "(protein_name = '" + cEntry + "')"
            case "topping":
                return "(ingr1_name = '" + cEntry + "' OR ingr2_name = '" + cEntry + "' OR ingr3_name = '" + cEntry + "' OR ingr4_name = '" + cEntry + "')"
            case "sauce":
                return "(sauce_name = '" + cEntry + "')"
        }
        
    }

    const sortComboReport = () => {
        comboReport.sort( (entry1, entry2) => 
            entry2.sales - entry1.sales
        )
        console.log(comboReport)
        setComboReport([...comboReport])
        
    }

    const categories = [
        { name: "protein" },
        { name: "topping" },
        { name: "sauce" },
    ]

    return (
        <Panel className="h-[48%]" title="Best Combo Report">
            {/* Displaying the value of protein */}
            {/* {category} */}
            <br />

            {/* Creating our dropdown and passing it the handleInputChangeReports 
            so that every time a new choice is selected, our report inputs state updates.
            */}
            <select id="c_category1" onChange={handleInputChange} value={inputs.c_category1}> 
                <option defaultValue={"-- Select a Category --"}>-- Select a Category --</option>
                        {/* Mapping through each fruit object in our fruits array
                    and returning an option element with the appropriate attributes / values.
                    */}
                {categories.map((category) => <option key={category.name} value={category.name}>{category.name}</option>)}
            </select>

            <br />
            <br />
            <br />

            {/* Creating our dropdown and passing it the handleInputChangeReports 
            so that every time a new choice is selected, our report inputs state updates.
            */}
            <select id="c_category2" onChange={handleInputChange} value={inputs.c_category2}> 
                <option defaultValue={"-- Select a Category --"}>-- Select a Category --</option>
                        {/* Mapping through each fruit object in our fruits array
                    and returning an option element with the appropriate attributes / values.
                    */}
                {categories.map((category) => <option key={category.name} value={category.name}>{category.name}</option>)}
            </select>
            
            <br />
            <br />
            <br />
            
            <Button onClick = {getBestSellingComboReport}>Generate Best Selling Combo Report</Button>
            
            <ReportEntries data={comboReport} type="combo" />
        </Panel>
    )
}

export default ComboReport