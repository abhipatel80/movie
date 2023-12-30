import React, { useState } from 'react';
import ContentWrapper from '../../../components/contentwrapper/ContentWrapper';
import dayjs from 'dayjs';
import Category from '../../../components/category/Category';
import CircleRating from '../../../components/circlerating/CircleRating';
import Img from '../../../components/lazyloadimg/Img';
import Poster from '../../../assets/no-poster.png';
import { useParams } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Playbtn from '../Playbtn';
import './style.scss';
import VideoPopup from '../../../components/videoPopup/VideoPopup';

const DetailsBanner = ({ video, credit }) => {

    const [show, setshow] = useState(false);
    const [videoid, setvideoid] = useState(null);

    const { url } = useSelector(state => state.home);

    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`);
    const alldata = data?.data;

    const category = alldata?.genres?.map((g) => g.id);

    const director = credit?.filter((val) => val.job === "Director");
    const writer = credit?.filter((val) => val.job === "Writer" || val.job === "Screenplay" || val.job === "Story");

    const toHours = (totalmin) => {
        const hours = Math.floor(totalmin / 60);
        const minutes = totalmin % 60;
        return `${hours}h ${minutes > 0 ? `${minutes}m` : ""}`
    }

    return (
        <>
            <div className="detailsBanner">
                {!loading ? (
                    <div>
                        <div className="backdrop-img">
                            <Img src={url.backdrop + alldata?.backdrop_path} />
                        </div>
                        <div className="opacity-layer"></div>
                        <ContentWrapper>
                            <div className="content">
                                <div className="left">
                                    <div className="posterImg">
                                        {alldata?.poster_path ? (
                                            <Img src={url.backdrop + alldata?.poster_path} className="posterImg" />
                                        ) : (
                                            <Img src={Poster} className="posterImg" />
                                        )}
                                    </div>
                                </div>
                                <div className="right">
                                    <div className="title">{`${alldata?.name || alldata?.title} (${dayjs(alldata?.release_date).format("YYYY")})`}</div>
                                    <div className="subtitle">
                                        {alldata?.tagline}
                                    </div>
                                    <Category data={category} />
                                    <div className="row">
                                        <CircleRating rating={alldata?.vote_average.toFixed(1)} />
                                        <div className="playbtn" onClick={() => { setshow(true), setvideoid(video.key) }}>
                                            <Playbtn />
                                            <span className="text">
                                                Watch Trailer
                                            </span>
                                        </div>
                                    </div>
                                    <div className="overview">
                                        <div className="heading">Overview</div>
                                        <div className="description">{alldata?.overview}</div>
                                    </div>
                                    <div className="info">
                                        {alldata?.status && (
                                            <div className="infoItem">
                                                <span className="text bold">Status: {" "}</span>
                                                <span className="text">{alldata?.status}</span>
                                            </div>
                                        )}
                                        {alldata?.release_date && (
                                            <div className="infoItem">
                                                <span className="text bold">Release Date: {" "}</span>
                                                <span className="text">{dayjs(alldata?.release_date).format("MMM DD, YYYY")}</span>
                                            </div>
                                        )}
                                        {alldata?.runtime && (
                                            <div className="infoItem">
                                                <span className="text bold">Runtime: {" "}</span>
                                                <span className="text">{toHours(alldata?.runtime)}</span>
                                            </div>
                                        )}
                                    </div>
                                    {director?.length > 0 && (
                                        <div className="info">
                                            <span className="text bold">Director: {" "}</span>
                                            <span className="text">
                                                {director?.map((val, i) => {
                                                    return (
                                                        <span key={i}>
                                                            {val.name}
                                                            {director?.length - 1 !== i && ", "}
                                                        </span>
                                                    )
                                                })}
                                            </span>
                                        </div>
                                    )}
                                    {writer?.length > 0 && (
                                        <div className="info">
                                            <span className="text bold">Writer: {" "}</span>
                                            <span className="text">
                                                {writer?.map((val, i) => {
                                                    return (
                                                        <span key={i}>
                                                            {val.name}
                                                            {writer?.length - 1 !== i && ", "}
                                                        </span>
                                                    )
                                                })}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <VideoPopup show={show} videoid={videoid} setshow={setshow} setvideoid={setvideoid} />
                        </ContentWrapper>
                    </div>
                ) : (
                    <div className="detailsBannerSkeleton">
                        <ContentWrapper>
                            <div className="left skeleton">
                                <div className="right">
                                    <div className="row skeleton"></div>
                                    <div className="row skeleton"></div>
                                    <div className="row skeleton"></div>
                                    <div className="row skeleton"></div>
                                    <div className="row skeleton"></div>
                                    <div className="row skeleton"></div>
                                    <div className="row skeleton"></div>
                                    <div className="row skeleton"></div>
                                </div>
                            </div>
                        </ContentWrapper>
                    </div>
                )}
            </div>
        </>
    )
}

export default DetailsBanner
