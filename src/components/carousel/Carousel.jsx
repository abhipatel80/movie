import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import ContentWrapper from "../contentwrapper/ContentWrapper";
import Img from '../lazyloadimg/Img';
import Poster from '../../assets/no-poster.png';
import './style.scss';
import CircleRating from "../circlerating/CircleRating";
import Category from "../category/Category";

const Carousel = ({ title, data, loading, endpoint }) => {

    const carouselContainer = useRef();
    const { url } = useSelector(state => state.home);
    const navigate = useNavigate();

    const navigation = (dir) => {
        const container = carouselContainer.current;
        const scrollamt = dir === 'left' ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20)
        container.scrollTo({
            left: scrollamt,
            behavior: "smooth"
        })
    }

    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton">
                    <div className="textBlock">
                        <div className="title skeleton"></div>
                        <div className="date skeleton"></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="carousel">
                <ContentWrapper>
                {title && <div className="carouselTitle">{title}</div>}
                    <BsFillArrowLeftCircleFill onClick={() => navigation("left")} className="carouselLeftNav arrow" />
                    <BsFillArrowRightCircleFill onClick={() => navigation("right")} className="carouselRightNav arrow" />
                    {!loading ? (
                        <div className="carouselItems" ref={carouselContainer}>
                            {data && data?.map((val) => {
                                const posterurl = val.poster_path ? url.poster + val.poster_path : Poster
                                return (
                                    <div className="carouselItem" onClick={() => navigate(`/${val.media_type || endpoint}/${val.id}`)} key={val.id}>
                                        <div className="posterBlock">
                                            <Img src={posterurl} />
                                            <CircleRating rating={val.vote_average.toFixed(1)} />
                                            <Category data={val.genre_ids.slice(0, 4)} />
                                        </div>
                                        <div className="textBlock">
                                            <span className="title">
                                                {val.title || val.name}
                                            </span>
                                            <span className="date">
                                                {dayjs(val.release_Date).format("MMM DD, YYYY")}
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="loadingSkeleton">
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                        </div>
                    )}
                </ContentWrapper>
            </div>
        </>
    )
}
export default Carousel
