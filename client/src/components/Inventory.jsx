import React from 'react'
import InventoryEntry from './InventoryEntry'


const Inventory = (props) => {
    const { data } = props;

    return (
        <div className="h-full px-[10px] overflow-auto">
            {data.map((item, index) => (
                <div key={item + "_" + index}>
                    <InventoryEntry key={item + "_" + index} item={item} />
                </div>
            ))}
        </div>
    )
}

export default Inventory