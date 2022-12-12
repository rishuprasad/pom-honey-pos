import React, { useState } from 'react'
import logo from '../assets/logo.png';
import { HiOutlineVolumeUp } from 'react-icons/hi'
import Button from '../components/Button';
import Modal from 'antd/lib/modal/Modal';
import menu from '../assets/menu.webp'
import { Button as AButton } from 'antd';
import ModalC from '../components/Modal';
import Cart from '../components/Customer/Cart';
import Mains from '../components/Customer/Mains';
import Starters from '../components/Customer/Starters';
import { useNavigate } from 'react-router-dom'


const Panel = ({ children, title, className }) => {
    return (
        <div className={'bg-white overflow-auto rounded-[15px] shadow-lg p-[5px] md:p-[20px] ' + className}>
            <p className="mb-[10px] pb-[12px] border-gray-500 border-b-1 text-left text-xl font-bold text-blue-500">{title}</p>
            {children}
        </div>
    )
}

const Customer1 = () => {
    
    const [visible, setVisible] = useState(false); //control modal view
    const navigate = useNavigate();
    
    // modal footer button group
    const customerFooter = [
        <AButton key="back">
            cancel
        </AButton>,
        <AButton key="submit" type="danger" >
            <i className="ri-delete-bin-4-fill"></i>
            delete
        </AButton>,
        <AButton
            key="link"
            href="https://google.com"
            type="primary"
        >
            confirm
        </AButton>,
    ]
    
    
    const [currentDish, setCurrentDish] = useState({})
        

    return (
        <div>
            <div className="pt-[30px] px-[50px]">
                <img className="h-[150px]" src={logo} />
            </div>
            <div className="absolute h-[70px] w-[70px] right-[50px] top-[30px] rounded-full flex items-center justify-around bg-blue-500 hover:opacity-50 shadow-md">
                <HiOutlineVolumeUp size={30} color="white" />
            </div>
            {/* click open cart modal */}
            <div onClick={() => setVisible(true)} className="absolute text-white h-[70px] w-[70px] right-[50px] top-[120px] rounded-full flex items-center justify-around bg-blue-500 hover:opacity-50 shadow-md">Cart</div>
            <div className="flex md:flex-row relative justify-between mt-[100px] px-[50px]">
                <Mains />
                <Starters currentDish={currentDish} setCurrentDish={setCurrentDish} />
            </div>
            <div className="flex px-[50px] mt-[20px]">
                <div style={{marginRight: '20px'}}>
                    <Button type="danger" className="relative bottom-[10px]" onClick={() => navigate('/')}>Log Off</Button>
                </div>
            </div>
            <ModalC
                close={() => setVisible(false)}
                visible={visible}
                title="Current Order & Check Out"
            >
                    <Cart></Cart>
            
            </ModalC>

        </div>
        
    )
}

export default Customer1