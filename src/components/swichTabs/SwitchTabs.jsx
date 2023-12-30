import React, { useState } from 'react'
import './style.scss'

const SwitchTabs = ({ data, onTabChange }) => {

    const [selectedTab, setselectedTab] = useState(0);
    const [left, setleft] = useState(0);

    const activeTab = (tab, index) => {
        setleft(index * 100)
        setTimeout(() => {
            setselectedTab(index)
        }, 300);
        onTabChange(tab, index)
    }

    return (
        <>
            <div className="switchingTabs">
                <div className="tabItems">
                    {data?.map((tab, index) => {
                        return (
                            <span onClick={() => activeTab(tab, index)} key={index} className={`tabItem ${selectedTab === index? 'active': ''}`}>{tab}</span>
                        )
                    })}
                    <span className="movingBg" style={{ left }} />
                </div>
            </div> 
        </>
    )
}

export default SwitchTabs
