import React from 'react'
import './style.scss'
import { useSelector } from 'react-redux'

const Category = ({ data }) => {

    const { category } = useSelector(state => state.home)

    return (
        <>
            <div className="genres">
                {data?.map((val) => {
                    if (!category[val]?.name) return;
                    return (
                        <div className="genre" key={val}>
                            {category[val]?.name}
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Category
