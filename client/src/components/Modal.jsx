import React,{ useState,useEffect } from 'react'
import { useCustomContext } from '../Context/Provider'

const Modal = ({ visible, children, close,title }) => {
    const { size,color } = useCustomContext();

    const [show,setShow] = useState(visible || false)

    const handleBeforeClose = () => {
        setShow(false);
        if(typeof close !== 'function') return;
        close();
    }

    useEffect(() => {
        setShow(visible)
    },[visible])

    return (
        <>
            {show &&
                <div 
                className="fixed flex py-[50px] items-center justify-around bg-[rgba(0,0,0,0.6)] top-0 left-0 w-[100vw] h-[100vh] z-[999]"
                style={{
                    fontSize: size + 'px',
                    color: color}}>
                    <div onClick={handleBeforeClose} className="w-full top-0 left-0 absolute h-full z-[1]"></div>
                    <div className="w-[600px] p-[20px] overflow-auto rounded-[8px] z-[10] bg-white">
                        <p className="font-bold pb-[10px] text-xl border-b text-blue-500">{title || 'title'}</p>
                        {children}
                    </div>
                </div>
            }
        </>
    )
}

export default Modal