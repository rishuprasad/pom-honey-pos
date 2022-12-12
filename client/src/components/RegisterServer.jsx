import React, { useState, useEffect } from 'react'
import Panel from './Panel2'
import Input from './Input'
import Button from './Button'


const RegisterCustomer = () => {
    const initialNewEmployee = {"new_fname": "", "new_lname": "", "new_username": "", "new_password": "", "new_role": "server"}
    const [newEmployee, setNewEmployee] = useState(initialNewEmployee)



    const handleInputChange = event => {
        const { id, value } = event.target
        setNewEmployee({ ...newEmployee, [id]: value })
    }

    const addEmployee = async (event) => {
        event.preventDefault();

        console.log("addEmployee sends request");
        
        const response = await fetch(`https://pos-server-ls88.onrender.com/new_user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEmployee),
        });

        setNewEmployee(initialNewEmployee);
        
        console.log("addEmployee gets response");
    }

    return (
        <Panel className="h-[48%]" title="Register New Server">
            <div className="mt-[20px]">
                <Input id="new_fname" label="First Name" handleInputChange={handleInputChange} value={newEmployee.new_fname}/>
                <Input id="new_lname" label="Last Name" handleInputChange={handleInputChange} value={newEmployee.new_lname}/>
            
                <Input id="new_username" label="Username" handleInputChange={handleInputChange} value={newEmployee.new_username}/>
                <Input id="new_password" type="password" label="Password" handleInputChange={handleInputChange} value={newEmployee.new_password}/>
            </div>
            <div className="flex justify-between">
                <Button onClick={addEmployee}>Add Server</Button>
            </div>
        </Panel>
    )

}

export default RegisterCustomer