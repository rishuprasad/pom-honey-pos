import React,{useState} from 'react'
import { HiEye,HiEyeOff } from 'react-icons/hi'
import { useCustomContext } from '../Context/Provider';

// inputs class with functions
const Input = (props) => {
    const { id,label,value,onChange,type,handleInputChange } = props;
    const [visible,setVisible] = useState(true);
    const { size,color } = useCustomContext();
    // get the type of input for later either showing the text or hidding the text for password
    const getType = () => {
        if(!type)
            return 'text'
        return type
    }

    const baseClasses = () => {
        return 'w-full outline-none h-full rounded-[5px] pl-[15px] border transition-all focus:border-blue-500 focus:shadow-md'
    }
    return (
        <div className={`mb-[12px] items-center relative ${size>20? '' :'flex  h-[40px] '}`}>
            <div className={`text-left mr-[7px] ${size>20? 'w-full ': 'min-w-[180px]'}`}>{label}:</div>
            <input id={id} type={getType()} className={baseClasses()} value={value} onChange={e => handleInputChange(e)}/>
            {/* <input type={visible? 'text': 'password'} className={baseClasses()} value={value} onChange={e => onChange(e)}/> */}
            {/* {getType() == 'password' &&  <div className="absolute right-[10px] top-[50%] translate-y-[-50%]" onClick={() => setVisible(!visible)}>
                { visible? <HiEye size={20} color="gray"/>: <HiEyeOff size={20} color="gray"/> }
            </div>} */}
        </div>
    )
}

export default Input