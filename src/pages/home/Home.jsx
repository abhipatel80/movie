import React from 'react'
import Hero from './herobanner/Hero'
import Trending from './trending/Trending'
import Popular from './popular/Popular'
import TopRated from './topRated/TopRated'
import './style.scss'

const Home = () => {
    return (
        <>
            <div className="homePage">
                <Hero />
                <Trending />
                <Popular />
                <TopRated />
            </div>
        </>
    )
}

export default Home
