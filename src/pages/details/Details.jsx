import React from 'react'
import './style.scss'
import DetailsBanner from './detailsBanner/DetailsBanner'
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import Cast from './cast/Cast'
import VideoSection from './videosSection/VideoSection'
import Recommendation from './carousels/Recommendation'
import Similar from './carousels/Similar'

const Details = () => {

  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits } = useFetch(`/${mediaType}/${id}/credits`);

  return (
    <>
      <DetailsBanner video={data?.data?.results?.[0]} credit={credits?.data?.crew} />
      <Cast data={credits?.data?.cast} loading={loading} />
      <VideoSection data={data?.data} loading={loading} />
      <Recommendation mediaType={mediaType} id={id} />
      <Similar mediaType={mediaType} id={id} />
    </>
  )
}

export default Details
