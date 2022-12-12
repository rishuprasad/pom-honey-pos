import React, { useState, useEffect } from 'react'
import Panel from '../components/Panel2'
import Input from '../components/Input'
import Button from '../components/Button'
import ReportEntries from './ReportEntries'


const SalesReport = () => {    
    const initialInputs = {"s_start_date": "", "s_end_date": ""}
    const [inputs, setInputs] = useState(initialInputs)

    const [salesReport, setSalesReport] = useState([])

    const START = "2022-09-11 00:00:00"

    const handleInputChange = event => {
        const { id, value } = event.target
        setInputs({ ...inputs, [id]: value })
    }

    const getSalesReport = async (event) => {
        event.preventDefault();

        for (let i = 0; salesReport.length; i++) { salesReport.pop(); }
        setSalesReport(salesReport);

        console.log("getSalesReport sends request");

        if (inputs.s_start_date == "") {
            inputs.s_start_date = START;
        }

        if (inputs.s_end_date == "") {
            inputs.s_end_date = getDateTime();
        }
        
        const response = await fetch(`https://pos-server-ls88.onrender.com/sales_report`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputs),
        });
        response
            .json()
            .then(response => setSalesReport(response))
            .catch(e => console.log(e))

        

        console.log("getSalesReport gets response");
    }

    function getDateTime() {
        var now     = new Date(); 
        var year    = now.getFullYear();
        var month   = now.getMonth()+1; 
        var day     = now.getDate();
        var hour    = now.getHours();
        var minute  = now.getMinutes();
        var second  = now.getSeconds(); 
        if (month.toString().length == 1) {
             month = '0' + month;
        }
        if (day.toString().length == 1) {
             day = '0' + day;
        }   
        if (hour.toString().length == 1) {
             hour = '0' + hour;
        }
        if (minute.toString().length == 1) {
             minute = '0' + minute;
        }
        if (second.toString().length == 1) {
             second = '0' + second;
        }   
        var dateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;   
        console.log("Made datetime: " + dateTime)
        
        return dateTime;
    }

    return (
        <Panel className="h-[48%]" title="Sales Report">
            <div>
                <div className="mt-[20px]">
                    <Input id="s_start_date" label="Start Date" handleInputChange={handleInputChange} value={inputs.s_start_date}/>
                    <Input id="s_end_date" label="End Date" handleInputChange={handleInputChange} value={inputs.s_end_date}/>
                </div>
                <Button onClick={getSalesReport}>Generate Sales Report</Button>
            </div>
            <ReportEntries data={salesReport} type="sales" />
        </Panel>
    )
}

export default SalesReport