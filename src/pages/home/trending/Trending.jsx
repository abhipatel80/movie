import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentwrapper/ContentWrapper'
import SwitchTabs from '../../../components/swichTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';
import '../style.scss'

const Trending = () => {

    const [endpoint, setendpoint] = useState("day");

    const { data, loading } = useFetch(`/trending/all/${endpoint}`);

    const onTabChange = (tab) => {
        setendpoint(tab === "Day" ? "day" : "week")
    }

    return (
        <>
            <div className="carouselSection">
                <ContentWrapper>
                    <span className='carouselTitle'>Trending</span>
                    <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
                </ContentWrapper>
                <Carousel data={data?.data?.results} loading={loading}/>
            </div> 
        </>
    )
}

export default Trending
