import React, { useState, useEffect } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { HiOutlineVolumeUp } from 'react-icons/hi'
import NavBar from '../components/NavBar'
import { useCustomContext } from '../Context/Provider'
import { useNavigate, useParams } from 'react-router-dom'
import menu from '../assets/menu.webp'
import Mains from '../components/Server/Mains'
import Starters from '../components/Server/Starters'
import Proteins from '../components/Server/Proteins'
import Toppings from '../components/Server/Toppings'
import Sauces from '../components/Server/Sauces'
import Cart from '../components/Server/Cart'
import ChangePassword from '../components/ChangePassword'



// the order item
const OrderItem = ({ price, name }) => {
    const baseClasses = 'flex rounded-[7px] justify-between shadow-md h-[50px] bg-gray-50 mb-[7px] transition-all hover:bg-gray-200 items-center px-[20px]'
    return (
        <div className={baseClasses}>
            <span>{name}</span>
            <span>{price}</span>
        </div>
    )
}

// panel
const Panel = ({ children, title, className }) => {
    return (
        <div className={'bg-white overflow-auto rounded-[15px] shadow-lg p-[5px] md:p-[20px] ' + className}>
            <p className="mb-[10px] pb-[12px] border-gray-500 border-b-1 text-left text-xl font-bold text-blue-500">{title}</p>
            {children}
        </div>
    )
}

// the page include display info
const Server = () => {
    const { username } = useParams();

    const initialCurrentUser = {"fname": '', "lname": '', "password": '', "role": '', "user_id": -1, "username": ''}
    const [currentUser, setCurrentUser] = useState(initialCurrentUser);

    useEffect(() => {
        fetchCurrentUser();
    }, [])

    const fetchCurrentUser = async () => {
        const response = await fetch(`https://pos-server-ls88.onrender.com/user_info`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"username": username}),
        });
        response
            .json()
            .then(response => setCurrentUser(response[0]))
            .catch(e => console.log(e))
    }

    const { size,color } = useCustomContext();
    
    
    const { user, handleChange } = useCustomContext();


    const initialCurrentDish = {"dish_name": "", "protein_name": "", "ingr1_name": "", "ingr2_name": "", "ingr3_name": "", "ingr4_name": "", "sauce_name": "", "have_drink": -1, "total_cost": -1.11}
    const [currentDish, setCurrentDish] = useState(initialCurrentDish)

    const [ingrCount, setIngrCount] = useState(0)


    const addIngredient = (item, category) => {
        let colname = "";
        let canAddIngredient = true;
        if (category == "protein") {
            colname = "protein_name";
        }
        if (category == "topping") {
            if (ingrCount < 4) {
                colname = "ingr" + (ingrCount+1) + "_name";
                setIngrCount(ingrCount + 1);
            }
            else {
                canAddIngredient =  false;
            }
        }
        if (category == "sauce") {
            colname = "sauce_name";
        }
        if (canAddIngredient) {
            console.log(colname);
            setCurrentDish({ ...currentDish, [colname]: item.ingredient_name });
        }
        else {
            console.log("Can't add ingredient");
        }
    }

    return (

        <div style={{color: color,fontSize: size}}>
            <NavBar currentUser={currentUser}/>
            <div className="flex flex-col md:flex-row h-[600px] relative mt-[90px] px-[50px]">
                <div className="absolute h-[70px] w-[70px] right-[50px] top-[0px] rounded-full flex items-center justify-around bg-blue-500 hover:opacity-50 shadow-md">
                    <HiOutlineVolumeUp size={30} color="white" />
                </div>
                { /*
                buttons functions:
                Cancel: delete everything in the cart which clear out the cart
                Delete: delete the current item or current order only in the cart, for example there is already one order
                in the cart and working on second order, Delete button will delete the second order keep the first order, 
                more like delete the current row in cart on database
                Add Order: add an order to the cart, more like create a new row in the cart in database
                Confirm: confirm the order and which push everything in the cart, update the order history and inventory
                then clear out the cart
                */}
                
                <Cart currentDish={currentDish} setCurrentDish={setCurrentDish} initialCurrentDish={initialCurrentDish} setIngrCount={setIngrCount} />
                <div className={'w-[800px] h-full flex flex-col justify-between'}>
                    {/* <Panel className="h-[100%]" title="User Settings">
                        <div className="flex justify-between">
                            <Button>Change Password</Button>
                            <Button type="danger">Log Off</Button>
                        </div>
                        <div className="mt-[20px]">
                            <Input label="Username" />
                            <Input type="password" label="Old Password" />
                            <Input type="password" label="New Password" />
                        </div>
                    </Panel> */}
                    <ChangePassword username={currentUser.username} />
                </div>
            </div>
            <div className="flex flex-col px-[50px] md:flex-row justify-between h-[800px] mt-[50px] pb-[50px] relative">
                <div className={'w-[50%] mr-[20px] h-full flex flex-col justify-between'}>
                    
                    <Mains currentDish={currentDish} setCurrentDish={setCurrentDish}/>
                    
                    <Starters currentDish={currentDish} setCurrentDish={setCurrentDish} />
                </div>
                <div className={'w-[50%] h-full flex flex-col justify-between'}>
                    {/* <Panel className="h-[48%]" title="Protein">
                        {
                            protein.map((item, index) => (
                                <div key={index} className="flex items-center justify-between mb-[12px]">
                                    <div className="w-[50px] h-[50px] rounded-[4px] overflow-hidden">
                                        <img className="w-full h-full" src={menu} />
                                    </div>
                                    <Button key={index}>{item}</Button>
                                </div>
                            ))
                        }
                    </Panel> */}
                    <Proteins addIngredient={addIngredient} />
                    <div className={'w-full h-[48%] mr-[20px] flex justify-between relative'}>
                        {/* <Panel className="w-[48%] h-full" title="Topings">
                            {
                                toppings.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between mb-[12px]">
                                        <div className="w-[50px] h-[50px] rounded-[4px] overflow-hidden">
                                            <img className="w-full h-full" src={menu} />
                                        </div>
                                        <Button key={index}>{item}</Button>
                                    </div>
                                ))
                            }
                        </Panel> */}
                        <Toppings addIngredient={addIngredient} />
                        {/* <Panel className="w-[48%] h-full" title="Sauces">
                            {
                                sauces.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between mb-[12px]">
                                        <div className="w-[50px] h-[50px] rounded-[4px] overflow-hidden">
                                            <img className="w-full h-full" src={menu} />
                                        </div>
                                        <Button key={index}>{item}</Button>
                                    </div>
                                ))
                            }
                        </Panel> */}
                        <Sauces addIngredient={addIngredient} />
                    </div>
                </div>
                {/* <Button className="absolute bottom-[10px] right-[10px]">View Order</Button> */}
            </div>
        </div>
    )
}

export default Server