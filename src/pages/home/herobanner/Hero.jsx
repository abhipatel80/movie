import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from '../../../components/lazyloadimg/Img';
import ContentWrapper from '../../../components/contentwrapper/ContentWrapper';
import './style.scss'

const Hero = () => {

    const [bg, setbg] = useState("");
    const [input, setinput] = useState("");

    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);

    const { data, loading } = useFetch('/movie/upcoming');

    useEffect(() => {
        const bgimg = url.backdrop + data?.data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path
        setbg(bgimg);
    }, [data])

    const change = (e) => {
        if (e.key === "Enter" && input.length > 0) {
            navigate(`/search/${input}`)
        }
    }

    return (
        <>
            <div className="herobanner">
                {!loading && <div className="backdrop-img">
                    <Img src={bg} className="lazy-load-image-background"/>
                </div>}
                <div className="opacity-layer"></div>
                <ContentWrapper>
                    <div className="herocontent">
                        <span className="title">Welcome</span>
                        <span className="subtitle"> Millions of movies, TV shows and people to discover. Explore now.</span>
                        <div className="searchinput">
                            <input type="text" onChange={(e) => setinput(e.target.value)} value={input} onKeyUp={change} placeholder='🔎 Search for movies or Tv shows...' />
                            <button>Search</button>
                        </div>
                    </div>
                </ContentWrapper>
            </div>
        </>
    )
}

export default Hero
