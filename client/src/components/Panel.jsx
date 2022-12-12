import React from 'react'
import {AiOutlineClose} from 'react-icons/ai';

/* Panel class with some parameters such as stuff inside of the panel as the child, title of the panel, class name and the visibility of the panel */
const Panel = ({ children, title, className, visible }) => {
    <div className={`${visible ? 'w-[500px] h-[600px] z-[999] opacity-1': 'z-[-1] opacity-0 w-[0] h-[0]'}` + ' bg-white relative overflow-auto transition-all rounded-[15px] shadow-lg p-[5px] max-h-[600px] md:p-[20px] ' + className}>
        <div className="absolute right-[10px] top-[10px]">
            <AiOutlineClose/>
        </div>
        <p className="mb-[10px] pb-[12px] border-gray-500 border-b-1 text-left text-xl font-bold text-blue-500">{title}</p>
        {children}
    </div>
}

export default Panel