import React, { useState, useEffect } from 'react'
import Panel from '../components/Panel2'
import Input from '../components/Input'
import Button from '../components/Button'
import ReportEntries from './ReportEntries'


const RestockReport = () => {
    const [restockReport, setRestockReport] = useState([])

    const getRestockReport = async (event) => {
        for (let i = 0; restockReport.length; i++) { restockReport.pop(); }
        setRestockReport(restockReport);

        console.log("getRestockReport sends request");
        
        const response = await fetch(`https://pos-server-ls88.onrender.com/restock_report`)
        response
            .json()
            .then(response => setRestockReport(response))
            .catch(e => console.log(e))

        console.log("getRestockReport gets response");
    }

    return (
        <Panel className="h-[48%]" title="Restock Report">
            <div>
                <Button onClick={getRestockReport}>Generate Restock Report</Button>
            </div>
            <ReportEntries data={restockReport} type="restock" />  
        </Panel>
    )
}

export default RestockReport