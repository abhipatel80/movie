import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentwrapper/ContentWrapper';
import SwitchTabs from '../../../components/swichTabs/SwitchTabs';
import Carousel from '../../../components/carousel/Carousel';
import useFetch from '../../../hooks/useFetch';
import '../style.scss'

const Popular = () => {
    const [endpoint, setendpoint] = useState("movie");

    const { data, loading } = useFetch(`/${endpoint}/popular`);

    const onTabChange = (tab) => {
        setendpoint(tab === "Movies" ? "movie" : "tv")
    }

    return (
        <>
            <div className="carouselSection">
                <ContentWrapper>
                    <span className='carouselTitle'>What's Popular</span>
                    <SwitchTabs data={["Movies", "Tv Shows"]} onTabChange={onTabChange} />
                </ContentWrapper>
                <Carousel endpoint={endpoint} data={data?.data?.results} loading={loading} />
            </div>
        </>
    )
}

export default Popular
