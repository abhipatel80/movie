import React from 'react'
import './style.scss'

const ContentWrapper = ({ children }) => {
    return (
        <>
            <div className="contwrap">
                {children}
            </div>
        </>
    )
}

export default ContentWrapper
