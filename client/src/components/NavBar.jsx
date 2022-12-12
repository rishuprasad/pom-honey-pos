import React,{useState} from 'react'
import defaultAvatar from '../assets/avatar.jpg'
import { useCustomContext } from '../Context/Provider'
import { useNavigate } from 'react-router-dom'
import Button from './Button'

// profile image
const Avatar = ({uri}) => {
    return (
        <div className="w-[40px] overflow-hidden h-[40px] rounded-full">
            <img className="w-[40px] h-[40px]" src={uri}/>
        </div>
    )
}

// nav bar infomation
const NavBar = (props) => {
    const { currentUser } = props
    
    const navigate = useNavigate();

    const cancelOrder = async () => {        
        console.log("clearCart sends response");
        
        const response = await fetch('https://pos-server-ls88.onrender.com/clear_cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: "",
        })
        console.log("clearCart got response");
    }

    const logOut = () => {
        cancelOrder();
        navigate('/');
    }

    return (
        <div className="px-[50px] fixed left-0 top-0 h-[70px] z-[999] flex justify-between items-center w-full bg-white">
            <div className="flex items-center">
                <Avatar uri={defaultAvatar}/>
                <div className="font-bold text-gray-500 ml-[12px]">{ currentUser.fname + " " + currentUser.lname }</div>
            </div>
            <Button onClick={logOut} type="danger">Log Off</Button>
        </div>
    )
}

export default NavBar