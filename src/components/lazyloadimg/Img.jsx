import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const Img = ({ src, className }) => {
    return (
        <>
            <LazyLoadImage src={src} effect='blur' alt="bg" className={className} />
        </>
    )
}

export default Img
