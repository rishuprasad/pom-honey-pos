import React, { useState, useEffect } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { HiOutlineVolumeUp } from 'react-icons/hi'
import NavBar from '../components/NavBar'
import { useCustomContext } from '../Context/Provider'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png';
import menu from '../assets/menu.webp'
import { Modal } from 'antd';


//order items which have price and names for the items
const OrderItem = ({ price, name }) => {
    const baseClasses = 'flex rounded-[7px] justify-between shadow-md h-[50px] bg-gray-50 mb-[7px] transition-all hover:bg-gray-200 items-center px-[20px]'
    return (
        <div className={baseClasses}>
            <span>{name}</span>
            <span>{price}</span>
        </div>
    )
}

// panels include children, title and the class names for creating panels
const Panel = ({ children, title, className }) => {
    return (
        <div className={'bg-white overflow-auto rounded-[15px] shadow-lg p-[5px] md:p-[20px] ' + className}>
            <p className="mb-[10px] pb-[12px] border-gray-500 border-b-1 text-left text-xl font-bold text-blue-500">{title}</p>
            {children}
        </div>
    )
}

// the landing page has lists displaying the stuff in "cart" for temporary, will be revised later
const Home = () => {
    const { color,size } = useCustomContext();
    const navigate = useNavigate();
    const protein = ["vegetable medley", "chicken", "gyro", "meatballs", "falafel"]
    const toppings = ["pickled onions", "diced cucumbers", "citrus couscous", "roasted cauliflower", "tomato-onion salad", "kalamata olives", "roasted peppers", "red cabbage slaw"]
    const sauces = ["hummus", "red pepper hummus", "jalapeno feta", "tzatziki", "greek vinaigrette", "harissa"]
    // under current order section
    const menuList = [
        {
            name: 'pita',
            children: ["falafel", "diced cucumbers", "tomato-onion salad", "roasted cauliflower", "roasted peppers", "tzatziki", "No Drink",],
            price: 7.69
        },
        {
            name: 'salad',
            children: ["falafel", "diced cucumbers", "tomato-onion salad", "roasted cauliflower", "roasted peppers", "tzatziki", "No Drink",],
            price: 7.69
        }
    ]
    const mainList =
        [
            { name: "grain bowl", price: '7.79' },
            { name: "salad", price: '7.69' },
            { name: "greens and grains", price: '7.69' },
            { name: "combo with drink", price: '8.99' },
            { name: "combo with fries and drink", price: '8.99' },
            { name: "pita", price: '7.69' }
    ]
    // set modal visible
    const [visible,setVisible] = useState(false);
    const { user, handleChange } = useCustomContext();

    // order items include, for testing only
    const [order, setOrder] = useState([
        { name: 'test order', price: '$100.8' },
    ])

    // get the total price of the order
    const getTotal = () => {
        let sum = 0;
        // get menu sum price
        sum = menuList.reduce((cur,item) => {
            return cur + item.price
        },0)
        // keep two digits
        return sum.toFixed(2);
    }
    // initialize the order list, with the array, can be changed to array read from database
    const initMockList = () => {
        // create order list with random price
        const mock = Array.from(new Array(20)).map((_, index) => ({ name: `order ${index}`, price: `$${Math.round(Math.random() * 50 + 10)}` }))
        setOrder(mock)
    }
    // when page render called, init mock order list
    useEffect(() => {
        initMockList()
    }, [])
    return (
        /*
        in the Main list, the ideal is click anything in main, it will pop up the windows for 
        protein, toppings and sauces, if click anything under Starter, it will just show the items in 
        Current Order/Check out. 
        */
        <div style={{color: color, fontSize: size + 'px'}}>
            <div className="pt-[30px] px-[50px]">
                <img  className="h-[200px]" src={logo} />
            </div>
            <div className="flex flex-col md:flex-row h-[600px] relative mt-[30px] px-[50px]">
                <div className="absolute h-[70px] w-[70px] right-[50px] top-[0px] rounded-full flex items-center justify-around bg-blue-500 hover:opacity-50 shadow-md">
                    <HiOutlineVolumeUp size={30} color="white" />
                </div>
                <div className={'w-[500px] h-full flex flex-col justify-between'}>
                    <Panel className="h-[100%]" title="Menu">
                        <p>Main List</p>
                        {mainList.map((item, index) => (
                            <div key={index} className="flex items-center justify-between mb-[12px]">
                                <Button onClick={() => setVisible(true)}>{item.name}</Button>
                                <span className="font-bold text-red-500">${item.price}</span>
                            </div>
                        ))}
                        <p>Starter</p>
                        {mainList.map((item, index) => (
                            <div key={index} className="flex items-center justify-between mb-[12px]">
                                <Button>{item.name}</Button>
                                <span className="font-bold text-red-500">${item.price}</span>
                            </div>
                        ))}
                    </Panel>
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
                <Panel title="Current Order & Check Out" className="mr-[25px] relative w-full md:w-[800px] h-full flex flex-col items-between">
                    <div className="h-full px-[10px] overflow-auto">
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
                            <span className="text-red-500">${getTotal()}</span>
                        </div>
                    </div>
                    <div className="min-h-[60px] items-center flex w-full">
                        <Button className="mx-[5px]">Cancel</Button>
                        <Button className="mx-[5px]">Delete</Button>
                        <Button className="mx-[5px]">Add Order</Button>
                        <Button className="mx-[5px]">Confirm</Button>
                    </div>
                </Panel>
            </div>
            {/*
            Other buttons functions:
            Server: take to server page for testing, later on can take off or keep it as refresh Home
            Login: take to log in page for logging in
            Accessibiliity: take to accessibility page for text font size changes and color changes
            Google Map: will pop up the google or take to google map as API for showing all branches
            */}
            <div className="flex px-[50px] mt-[20px]">
                <div style={{marginRight: '20px'}}>
                    <Button onClick={() => navigate('/server')}>Server</Button>
                </div>
                <div className="mr-[20px]">
                    <Button onClick={() => navigate('/login')}>Login</Button>
                </div>
                <div className="mr-[20px]">
                    <Button onClick={() => navigate('/acc')}>Accessibility</Button>
                </div>
                <div className="mr-[20px]">
                    <Button onClick={() => navigate('/acc')}>Google Map</Button>
                </div>
                <div className="mr-[20px]">
                    <Button onClick={() => navigate('/customer1')}>Customer1</Button>
                </div>
                <div className="mr-[20px]">
                    <Button onClick={() => navigate('/customer2')}>Customer2</Button>
                </div>
            </div>
            <Modal onOk={() => setVisible(false)} onCancel={() => setVisible(false)} visible={visible} title="Add Ons">
                        <p>Toppings</p>
                        {mainList.map((item, index) => (
                            <div key={index} className="flex items-center justify-around mb-[12px]">
                                <Button onClick={() => setVisible(true)}>{item.name}</Button>
                            </div>
                        ))}
                        <p>Protein</p>
                        {mainList.map((item, index) => (
                            <div key={index} className="flex items-center justify-around mb-[12px]">
                                <Button onClick={() => setVisible(true)}>{item.name}</Button>
                            </div>
                        ))}
                        <p>Sauces</p>
                        {mainList.map((item, index) => (
                            <div key={index} className="flex items-center justify-around mb-[12px]">
                                <Button onClick={() => setVisible(true)}>{item.name}</Button>
                            </div>
                        ))}
            </Modal>
        </div>
    )
}

export default Home