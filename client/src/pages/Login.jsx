import React,{useState} from 'react'
import Input from '../components/Input'
import { Modal,Input as AInput } from 'antd';
import Button  from '../components/Button'
import {UserOutlined,LockOutlined} from  '@ant-design/icons';
import {HiOutlineVolumeUp} from 'react-icons/hi'
import { useNavigate } from 'react-router-dom';
import {useCustomContext} from '../Context/Provider'
import logo from '../assets/logo.png'
import { message } from 'antd';

const Login = () => {
    const { size,color } = useCustomContext();
    // the visibility of the pop window
    const [visible,setVisible] = useState(false)
    // username and password variables
    const [user,setUser] = useState({
        username: '',
        password: ''
    })

    // change the value
    const handleChange = (v,name) => {
        setUser(prev => ({...prev,[name]: v}))
    }

    const logIn = async () => {
        console.log("logIn sends request");
        
        const response = await fetch(`https://pos-server-ls88.onrender.com/credentials`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        response
            .json()
            .then(response => checkCredentials(response))
            .catch(e => console.log(e))
        
        console.log("logIn gets response");
    }

    const checkCredentials = (users) => {
        if (users.length == 0) {
            
            // JC : ADD POPUP SAYING UNSUCCESSFUL LOGIN ATTEMPT
            message.error('Unsuccessful Attempt');

            console.log("Not a valid user")
            setUser({username: '', password: ''})
        }
        else {
            navigateToPages(users[0].username, users[0].role)
        }
    }

    const navigateToPages = (username, role) => {
        switch (role) {
            case "server":
                navigate("/server/" + username);
                break;
            case "manager":
                navigate("/manager/" + username);
                break;
        }
    }

    // navigate
    const navigate = useNavigate();
    // go to landing page when called
    const toHome = () => {
        navigate('/')
    }
    const toCus = () => {
        navigate('/customer1')
    }

    const toMap = () => {
        navigate('/maps')
    }
    const toACC = () => {
        navigate('/acc')
    }

    return (
        <div 
        className="w-[100vw] relative h-[100vh] flex items-center justify-around bg-gray-200"
        style={{color: color}}>
            <div className="absolute h-[70px] top-[60px] w-[70px] right-[50px] rounded-full flex items-center justify-around bg-blue-500 hover:opacity-50 shadow-md">
                    <HiOutlineVolumeUp size={30} color="white" />
                </div>
            <div className="w-[450px] rounded-[4px] bg-white py-[50px] px-[50px] shadow-lg">
                    <img src={logo}/>
                    <br/>
                    <br/>
                <AInput value={user.username} onChange={e => handleChange(e.target.value,'username')} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                <br/>
                <br/>
                <AInput
                value={user.password} onChange={e => handleChange(e.target.value,'password')}
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                />
                <br/>
                <br/>
                <Button block type="primary" onClick={logIn} >Login</Button>
                
                <div className="flex items-center justify-between">
                    {/* <Button onClick={toHome} type="danger">Cancel</Button> */}
                    {/* <Button type="primary" onClick={() => setVisible(true)}>Sign Up</Button> */}
                </div> 
                <br/>
                <Button onClick={toCus} type="warning">Continue as Customer</Button>
                <br/>
                {/* <Button type="gogo" onClick={() => setVisible(true)}>Sign Up</Button>
                <br/> */}
                
                <Button block type="green" onClick={toACC}>Accessibilities</Button>
                <br/>
                <Button block type="pop" onClick={toMap}>Google Map</Button>
                <br/>
                <div style={{fontSize: size}}
                className="flex items-center mt-[20px]"><span>Login with</span> <span className="cursor-pointer text-red-500 ml-[10px]">Google</span></div>
            </div>
            <Modal onOk={() => setVisible(false)} onCancel={() => setVisible(false)} visible={visible} title="Register New Customer">
                <div className="mt-[20px]">
                    <Input label="First Name" />
                    <Input label="Last Name"/>
                    <Input label="Username" />
                    <Input type="password" label="Password" />
                </div>
                <div className="flex justify-between">
                    <Button >Cancel</Button>
                    <Button type="danger">Register</Button>
                </div>
            </Modal>
        </div>
    )
}

export default Login