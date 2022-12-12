
import React, { useState } from 'react'
import { Button, Modal, Card, Select, message } from 'antd';
import { HiOutlineVolumeUp } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom';
import { InputNumber } from 'antd';
import { useCustomContext } from '../Context/Provider';
import logo from '../assets/logo.png'

// color tag property color -> background
// active -> is this tag selected
const ColorTag = ({ color, active }) => {
    return (
        <div
            className={`w-[40px] h-[40px] transition-all`}
            style={
                { background: color, border: active ? '2px solid white' : '2px solid transparent' }
            }></div>
    )
}

const Accessibility = () => {
    const navigate = useNavigate(); //use navigate to jump
    const { colorList, setSize, setColor, color, size } = useCustomContext(); //get context variable
    const [currentColor, setCurrentColor] = useState(color); // store current color
    const [currentSize, setCurrentSize] = useState(size) //store current size value

    // apply change font size and color
    const handleApply = () => {
        //change the context variable so that all components and pages can get and change their font style then back to landing page
        setColor(currentColor)
        setSize(currentSize)
        message.success('font style changed')
        navigate('/')
    }

    // back to landing page when called
    const toHome = () => {
        navigate('/')
    }
    return (
        <div className="bg-gray-50">
            <div style={{ color: color, fontSize: size + '!important' }} className="w-[100vw] relative h-[100vh] flex items-center justify-around bg-gray-50">
                {/* voice btn */}
                <div className="absolute h-[70px] top-[60px] w-[70px] right-[50px] rounded-full flex items-center justify-around bg-blue-500 hover:opacity-50 shadow-md">
                    <HiOutlineVolumeUp size={30} color="white" />
                </div>
                <div className="w-[600px] h-[800px] rounded-[15px] bg-white py-[30px] px-[30px] shadow-lg">
                    <div className="mb-[20px]">
                        <img className="h-[150px]" src={logo} />
                    </div>
                    <p className="mb-[10px] pb-[12px] border-gray-500 border-b-1 text-left text-[40px] font-bold text-blue-500">Accessibility</p>
                    {/* properties setting card  */}
                    <Card
                        title="Font setting"
                        style={{
                            width: '100%',
                        }}
                    >
                        {/* <Input label="Font style"/> */}
                        <div className="flex items-center mb-[20px]">
                            <div className="mr-[8px] min-w-[120px]">Font Size</div>
                            <InputNumber onChange={v => setCurrentSize(v)} value={currentSize} />
                        </div>
                        <div className="flex items-center">
                            <div className="mr-[8px] min-w-[120px]">Color</div>
                            {colorList.map((item, index) => (<div onClick={() => setCurrentColor(item)} key={index} ><ColorTag active={currentColor == item} color={item} /></div>))}
                        </div>
                    </Card>
                    {/* translate options */}
                    <div className="mt-[20px]">
                        <Select
                            defaultValue={'Translate'}
                            style={{ width: 200 }}
                            options={[
                                { label: 'Spanish', value: 'Spanish', },
                                { label: 'Chinese', value: 'Chinese', }
                            ]}
                        />
                    </div>
                    {/* cancel and apply button */}
                    <div className="flex justify-between mt-[20px]">
                        <Button type="danger" onClick={toHome}>Cancel</Button>
                        <Button type="primary" onClick={handleApply}>Apply</Button>
                    </div>
                </div>
            </div></div>
    )
}

export default Accessibility