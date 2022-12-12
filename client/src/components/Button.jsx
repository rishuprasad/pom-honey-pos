import React,{useRef} from 'react'
import { useCustomContext } from '../Context/Provider';

// buttons class with functions
const Button = (props) => {
    // use the useRef hook to get the button dom instance
    const cur = useRef();
    // import property from context
    const { size,color } = useCustomContext();
    const { children,round,className,type,block,onClick } = props;
    // mouse enter change size to the setting size
    const onEnter = () => {
        cur.current.style.fontSize = size + 'px'
    }
    // mouse leave change size to the initial size
    const onLeave = () => {
        cur.current.style.fontSize = '16px'
    }
    // color or style for buttons
    const baseClasses = () => {
        let extraClasses = '';
        switch(type) {
            case "primary": 
                extraClasses = 'bg-blue-500';
                break;
            case "danger": 
                extraClasses = 'bg-red-500';
                break;
            case "warning": 
                extraClasses = 'bg-yellow-500';
                break;
            case "gogo": 
                extraClasses = 'bg-pink-500';
                break;
            case "pop": 
                extraClasses = 'bg-purple-500';
                break;
            case "green":
                extraClasses = 'bg-green-500';
                break;
        } 
        if(block) {
            extraClasses += ' ' + 'w-full'
        }
        return ' ' + 'text-[16px] px-[15px] h-[40px] text-white hover:opacity-75 shadow-lg leading-[40px] text-center bg-blue-500 cursor-pointer hover:scale-110 transition-all ' + extraClasses
    }
    return (
        <div 
        ref={cur}
        onClick={onClick || (() => {})}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        className={`${round? 'rounded-full':'rounded-[4px]' + baseClasses() + ' ' + className } 
        `}>{children}</div>
    )
}

export default Button