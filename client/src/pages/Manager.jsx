import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import Panel from '../components/Panel2'
import Button from '../components/Button'
import CheckInventory from '../components/CheckInventory'
import SearchMenu from '../components/SearchMenu'
import ChangeMenu from '../components/ChangeMenu'
import { HiOutlineVolumeUp } from 'react-icons/hi'
import { useNavigate, useParams } from 'react-router-dom';



const Manager = () => {

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

    // navigation
    const navigate = useNavigate();
    // to report pages
    const toSalesReport = () => {
        navigate('/salesReport')
    }
    const toExcessReport = () => {
        navigate('/excessReport')
    }
    const toBestSellersReport = () => {
        navigate('/bestSellersReport')
    }
    const toRestockReport = () => {
        navigate('/restockReport')
    }
    const toRegisterEmployee = () => {
        navigate('/registerEmployee')
    }
    const toRecordRestock = () => {
        navigate('/recordRestock')
    }

    return (
        <>
            <NavBar currentUser={currentUser} />
            <div className={'w-[200px] mb-[20px] mt-[20px] h-full flex flex-col justify-between ml-[25px]'}>
                    <Button type="danger">Log Off</Button>
            </div>

            <div className="flex flex-col md:flex-row h-[700px] mb-[50px] relative">

                <div className="absolute h-[70px] w-[70px] right-[10px] top-[-20px] rounded-full flex items-center justify-around bg-blue-500 hover:opacity-50 shadow-md">
                    <HiOutlineVolumeUp size={40} color="white"/>
                </div>
                <CheckInventory />

                <SearchMenu />
                
                <div className={'w-[500px] h-full flex flex-col justify-between'}>
                    <ChangeMenu />
                </div>
               {/* <div className={'w-[200px] h-full flex flex-col justify-between ml-[25px]'}>
                    <Panel className="h-[48%]" title="Sign Out">
                        <div className="flex justify-between">
                            <Button type="danger">Log Off</Button>
                        </div> 
                    </Panel>
                </div>
             */}
              
            </div>

            <div className="flex flex-col md:flex-row justify-between h-[150px] mt-[0px] pb-[0px] relative">
                <div className={'w-[16%]  mr-[20px] ml-[20px]'}>
                    <Button onClick={toRegisterEmployee}>Register Employee</Button>
                </div>

                <div className={'w-[16%]  mr-[20px]'}>
                    <Button onClick={toRecordRestock}>Record Restock Order</Button>
                </div>

                <div className={'w-[16%]  mr-[20px]'}>
                    <Button onClick={toRestockReport}>View Restock Report</Button>
                </div>

                <div className={'w-[16%]  mr-[20px]'}>
                    <Button onClick={toSalesReport}>View Sales Report</Button>
                </div>
                
                <div className={'w-[16%]  mr-[20px]'}>
                    <Button onClick={toExcessReport}>View Excess Report</Button>
                </div>

                <div className={'w-[16%] mr-[20px]'}>
                    <Button onClick={toBestSellersReport}>View Combo Report</Button>
                </div>
                <Button className="absolute bottom-0 right-0">Accessibility</Button>
            </div>

        </>
    )
}

export default Manager
