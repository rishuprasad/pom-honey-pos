import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button'
import Input from './Input'

const Panel = ({ children, title, className }) => {
    return (
        <div className={'bg-white overflow-auto rounded-[15px] shadow-lg p-[5px] md:p-[20px] ' + className}>
            <p className="mb-[10px] pb-[12px] border-gray-500 border-b-1 text-left text-xl font-bold text-blue-500">{title}</p>
            {children}
        </div>
    )
}

// Panels
const ChangePassword = (props) => {
    const { username } = props
    const navigate = useNavigate();

    const initialCurrentServer = {"username": username, "old_password": "", "updated_password": ""}
    const [currentServer,setCurrentServer] = useState(initialCurrentServer)

    const handleChangeCurrentServer = (event) => {
        const { id, value } = event.target
        console.log("'" + id + "': '" + value + "'")
        setCurrentServer({ ...currentServer, [id]: value })
    }

    const changePassword = async (event) => {
        event.preventDefault()

        console.log("changePassword sent request");

        const response = await fetch('https://pos-server-ls88.onrender.com/change_password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(currentServer),
        })

        setCurrentServer(initialCurrentServer);

        console.log("changePassword got response");
    }


    const logOut = async (event) => {
        event.preventDefault();

        setCurrentServer(initialCurrentServer);
        
        navigate('/');
        
    }

    

    return (
        <Panel className="h-[100%]" title="User Settings">
            
            <div className="mt-[20px]">
                <Input id="old_password" type="password" label="Old Password" handleInputChange={handleChangeCurrentServer} value={currentServer.old_password}/>
                <Input id="updated_password" type="password" label="New Password" handleInputChange={handleChangeCurrentServer} value={currentServer.updated_password}/>
            </div>
            <div className="flex justify-between">
                <Button onClick={changePassword}>Change Password</Button>
                {/* <Button visible={false} onClick={logOut} type="danger">Log Off</Button> */}
            </div>
        </Panel>
    )
}

export default ChangePassword