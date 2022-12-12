import React from 'react'
import ReportEntry from './ReportEntry'


const ReportEntries = (props) => {
    const { data, type } = props;

    return (
        <div className="h-full px-[10px] overflow-auto">
            {data.map((item, index) => (
                <div key={item + "_" + index}>
                    <ReportEntry key={item + "_" + index} item={item} type={type}/>
                </div>
            ))}
        </div>
    )
}

export default ReportEntries