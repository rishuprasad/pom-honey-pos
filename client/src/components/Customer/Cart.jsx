import React, { useState, useEffect } from 'react'
import Button from '../Button'
import CartItem from './CartItem'


const Cart = (props) => {

    const [cart,setCart] = useState([])

    useEffect(() => {
        fetchCart();
    }, [])
    
    const fetchCart = async () => {
        const result = await fetch(`https://pos-server-ls88.onrender.com/cart`)
        result
            .json()
            .then(result => setCart(result))
            .catch(e => console.log(e))
    }

    // get the total price
    const getTotal = () => {
        let sum = 0;
        for (let i = 0; i < cart.length; i++) {
            sum += parseFloat(cart.at(i).total_cost)
        }
        return sum;
    }

    const deleteLastDish = async (event) => {
        console.log("deleteLastDish sends request");

        const response = await fetch('https://pos-server-ls88.onrender.com/delete_last_dish', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        console.log("deleteLastDish got response");
        fetchCart();
    }

    const cancelOrder = async () => {
        // clear cart        
        console.log("clearCart sends response");
        await fetch('https://pos-server-ls88.onrender.com/clear_cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: "",
        })
        console.log("clearCart got response");
        fetchCart();
    }

    const updateInventory = async (ingredient_name, num_servings) => {
        await fetch('https://pos-server-ls88.onrender.com/update_inventory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"ingredient_name": ingredient_name, "num_servings": num_servings}),
        })
    }

    const nextOrderID = async (cart_item) => {
        const response = await fetch('https://pos-server-ls88.onrender.com/next_order_id')
        response
            .json()
            .then((response) => pushCartToOrders(cart_item, response[0].order_id))
    }

    const pushCartToOrders = async (cart_item, order_id) => {
        cart_item.order_id = order_id;
        await fetch('https://pos-server-ls88.onrender.com/push_cart_item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cart_item),
        })
    }

    const confirmOrder = async () => {
        // update inventory
        // add to order history
        // clear cart
        
        console.log("updateInventory sends response");
        cart.forEach( (cart_item) => {
            let keys = ['protein_name', 'ingr1_name', 'ingr2_name', 'ingr3_name', 'ingr4_name', 'sauce_name']
            keys.forEach((key) => {
                if (cart_item[key] != null) {
                    updateInventory(cart_item[key], -1)
                }
            })
        })
        console.log("updateInventory got response");

        console.log("pushCartToOrders sends response");
        cart.forEach( (cart_item) => {
            cart_item.time = getDateTime();
            nextOrderID(cart_item);
        })
        console.log("updateInventory got response");

        
        console.log("clearCart sends response");
        await fetch('https://pos-server-ls88.onrender.com/clear_cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: "",
        })
        console.log("clearCart got response");
        
        fetchCart();
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

    const Panel = ({ children, title, className }) => {
        return (
            <div className={'bg-white overflow-auto rounded-[15px] shadow-lg p-[5px] md:p-[20px] ' + className}>
                <p className="mb-[10px] pb-[12px] border-gray-500 border-b-1 text-left text-xl font-bold text-blue-500">{title}</p>
                {children}
            </div>
        )
    }

    return (
        <Panel className="mr-[25px] relative w-full md:w-[500px] h-full flex flex-col items-between">
            <div className="h-full px-[10px] overflow-auto">
                {cart.map((item, index) => (
                    <CartItem key={item + "_" + index} item={item} index={index} />
                ))}
                <div className="flex font-bold text-xl justify-between items-center">
                    <span>Total</span>
                    <span className="text-red-500">${getTotal()}</span>
                </div>
            </div>
            <div className="min-h-[60px] items-center flex w-full">
                <Button onClick={cancelOrder} className="mx-[5px]">Cancel</Button>
                <Button onClick={deleteLastDish} className="mx-[5px]">Delete Last Dish</Button>
                {/* <Button onClick={addDishToCart} className="mx-[5px]">Add Dish</Button> */}
                <Button onClick={confirmOrder} className="mx-[5px]">Confirm</Button>
            </div>
        </Panel>
    )
}

export default Cart