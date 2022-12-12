import React from 'react'
import MenuEntry from './MenuEntry'


const Menu = (props) => {
    const { data } = props;

    return (
        <div className="h-full px-[10px] overflow-auto">
            {data.map((item, index) => (
                <div key={item + "_" + index}>
                    <MenuEntry key={item + "_" + index} item={item} />
                </div>
            ))}
        </div>
    )
}

export default Menu
