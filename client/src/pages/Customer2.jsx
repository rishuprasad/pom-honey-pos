import React, { useState } from 'react'
import logo from '../assets/logo.png';
import { HiOutlineVolumeUp } from 'react-icons/hi'
import Button from '../components/Button';
import Modal from 'antd/lib/modal/Modal';
import menu from '../assets/menu.webp'
import { Button as AButton } from 'antd';
import ModalC from '../components/Modal';
import Proteins from '../components/Customer/Proteins';
import Toppings from '../components/Customer/Toppings';
import Sauces from '../components/Customer/Sauces';
import Cart from '../components/Customer/Cart';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';





const Panel = ({ children, title, className }) => {
    return (
        <div className={'bg-white overflow-auto rounded-[15px] shadow-lg p-[5px] md:p-[20px] ' + className}>
            <p className="mb-[10px] pb-[12px] border-gray-500 border-b-1 text-left text-xl font-bold text-blue-500">{title}</p>
            {children}
        </div>
    )
}

const Customer2 = () => {
    
    const [visible, setVisible] = useState(false); //control modal view
    const navigate = useNavigate(); //use navigate to jump
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

        const [ingrCount, setIngrCount] = useState(0)
    
    
        const addIngredient = async (item, category) => {
            let colname = "";
            if (category == "protein") {
                colname = "protein_name";
                message.success('Protein Added');
            }
            if (category == "topping") {
                let new_count = ((ingrCount) % 4 + 1);
                colname = "ingr" + new_count + "_name";
                setIngrCount(new_count);
                message.success('Topping Added');
            }
            if (category == "sauce") {
                colname = "sauce_name";
                message.success('Sauces Added')
            }

            console.log(colname);
            console.log("addIngredient sends request");
        
            const response = await fetch('https://pos-server-ls88.onrender.com/add_ingr', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"col_name": colname, "ingredient_name": item.ingredient_name}),
            })

            console.log("addIngredient got response");
        }

        const addDrink = async () => {
            console.log("addDrink sends request");
        
            const response = await fetch('https://pos-server-ls88.onrender.com/add_drink')

            console.log("addDrink got response");

            message.success('Drink Added')
        }

        const finalizeDish = async () => {

            // JC : NAVIGATE BACK TO CUSTOMER 1
            navigate('/customer1');
            message.success('Items Added To Cart');


            console.log("finalizeDish sends request");
        
            const response = await fetch('https://pos-server-ls88.onrender.com/finalize')

            console.log("finalizeDish got response");
        }

    
    return (
        <div>
            <div className="pt-[30px] px-[60px]">
                <img className="h-[150px]" src={logo} />
            </div>
            <div className="absolute h-[70px] w-[70px] right-[60px] top-[30px] rounded-full flex items-center justify-around bg-blue-500 hover:opacity-50 shadow-md">
                <HiOutlineVolumeUp size={30} color="white" />
            </div>
            {/* click open cart modal */}
            <div onClick={() => setVisible(true)} className="absolute text-white h-[70px] w-[70px] right-[60px] top-[120px] rounded-full flex items-center justify-around bg-blue-500 hover:opacity-50 shadow-md">Cart</div>
            <div className="flex md:flex-row mt-[120px] relative justify-between px-[60px]">
                {/* <Panel className="w-[48%]" title="Protein">
                <div className="flex w-[100%] overflow-auto">
                        {mainList.map((item, index) => (
                            <div key={index} className="flex flex-col h-[270px] mr-[20px] items-center justify-between mb-[12px]">
                                <div className="w-[100px] h-[100px] rounded-[4px] overflow-hidden">
                                    <img className="w-full h-full" src={menu} />
                                </div>
                                <Button>{item.name}</Button>
                                <span className="font-bold text-red-500">${item.price}</span>
                            </div>
                        ))}
                    </div>
                </Panel> */}
                <Proteins addIngredient={addIngredient}/>
                {/* <Panel className="w-[48%]" title="Toppings">
                <div className="flex w-[100%] overflow-auto">
                        {mainList.map((item, index) => (
                            <div key={index} className="flex flex-col h-[270px] mr-[20px] items-center justify-between mb-[12px]">
                                <div className="w-[100px] h-[100px] rounded-[4px] overflow-hidden">
                                    <img className="w-full h-full" src={menu} />
                                </div>
                                <Button>{item.name}</Button>
                                <span className="font-bold text-red-500">${item.price}</span>
                            </div>
                        ))}
                    </div>
                </Panel> */}
                <Toppings addIngredient={addIngredient}/>
                {/* <Panel className="w-[48%]" title="Sauce">
                <div className="flex w-[100%] overflow-auto">
                        {mainList.map((item, index) => (
                            <div key={index} className="flex flex-col h-[270px] mr-[20px] items-center justify-between mb-[12px]">
                                <div className="w-[100px] h-[100px] rounded-[4px] overflow-hidden">
                                    <img className="w-full h-full" src={menu} />
                                </div>
                                <Button>{item.name}</Button>
                                <span className="font-bold text-red-500">${item.price}</span>
                            </div>
                        ))}
                    </div>
                </Panel> */}
                <Sauces addIngredient={addIngredient}/>
            </div>
            <div className="flex justify-around px-[60px] mt-[20px]">
                <div className="flex">
                <Button className="mr-[20px]" onClick={addDrink}>Add Drink</Button>
                <Button className="mr-[20px]" onClick={finalizeDish}>Add to Cart</Button>
                </div>
            </div>
            <ModalC
                onOk={() => setVisible(false)}
                close={() => setVisible(false)}
                visible={visible}
                style={{fontSize: '30px'}}
                title="Current Order & Check Out"
            >
                    {/* <div className="h-full px-[10px] overflow-auto">
                        {menuList.map((item, index) => (
                            <div className="mb-[20px]">
                                <div className="flex font-bold text-xl justify-between items-center">
                                    <span>{item.name}</span>
                                    <span className="text-red-500">${item.price}</span>
                                </div>
                                <div className="text-right mt-[12px]">
                                    {item.children && item.children.map((citem, index) => (
                                        <div className="text-left" key={index}>{citem}</div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <div className="flex font-bold text-xl justify-between items-center">
                            <span>Total</span>
                            <span className="text-red-500">$100.5</span>
                        </div>
                    </div>
                    <div className="min-h-[60px] items-center flex w-full">
                        <Button className="mx-[5px]">Cancel</Button>
                        <Button className="mx-[5px]">Delete</Button>
                        <Button className="mx-[5px]">Confirm</Button>
                    </div> */}
                    <Cart></Cart>
            </ModalC>
        </div>
    )
}

export default Customer2