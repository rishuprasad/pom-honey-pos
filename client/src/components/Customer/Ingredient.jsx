import React,{useRef} from 'react'
import { useCustomContext } from '../../Context/Provider';
import menu from '../../assets/menu.webp'

// buttons
const Ingredient = (props) => {
    const { label, onClick, round,className,type,block} = props;
    let image = require('../../assets/images/meatballs.webp')
    if (label != null) {
        image = require('../../assets/images/' + label.replaceAll(" ", "-") + ".webp")
    }
    // use the useRef hook to get the button dom instance
    const cur = useRef();
    // import property from context
    const { size,color } = useCustomContext();
    //const { children,round,className,type,block,onClick } = props;
    // mouse enter change size to the setting size
    const onEnter = () => {
        cur.current.style.fontSize = size + 'px'
    }
    // mouse leave change size to the initial size
    const onLeave = () => {
        cur.current.style.fontSize = '16px'
    }
    // styles
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
            case "good":
                extraClasses = 'bg-green-500';
                break;
        } 
        if(block) {
            extraClasses += ' ' + 'w-full'
        }
        return ' ' + 'px-[15px] h-[40px] text-white hover:opacity-75 shadow-lg leading-[40px] text-center bg-blue-500 cursor-pointer ' + extraClasses
    }
    return (
        
        
            <div className="flex flex-col h-[270px] mr-[20px] items-center justify-between mb-[12px]">
                <div className="w-[100px] h-[100px] rounded-[4px] overflow-hidden">
                    <img className="w-full h-full" src={image} />
                </div>
                <div 
                ref={cur}
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
                className={`${round? 'rounded-full':'rounded-[4px]' + baseClasses() + ' ' + className }`}>
                    <button onClick={onClick}>{label}</button>
                </div>
            </div>
        
        
    )
}

export default Ingredient