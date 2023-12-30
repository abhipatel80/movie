import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../utils/api';
import InfiniteScroll from 'react-infinite-scroll-component';
import ContentWrapper from '../../components/contentwrapper/ContentWrapper';
import noresults from '../../assets/no-results.png';
import Spinner from '../../components/spinner/Spinner';
import MovieCard from '../../components/moviecard/MovieCard';
import './style.scss';

const Search = () => {

  const [maindata, setmaindata] = useState();
  const [pagenum, setpagenum] = useState(1);
  const [loading, setloading] = useState(false);
  const { query } = useParams();

  const fetchinidata = () => {
    setloading(true)
    fetchData(`/search/multi?query=${query}&page=${pagenum}`).then((res) => {
      setmaindata(res);
      setpagenum((prev) => prev + 1);
      setloading(false)
    })
  };

  const fetchnextpagedata = () => {
    fetchData(`/search/multi?query=${query}&page=${pagenum}`).then((res) => {
      if (maindata?.data?.results) {
        setmaindata({
          ...maindata, results: [...maindata?.data?.results, ...res?.data?.results]
        })
      } else {
        setmaindata(res?.data)
      }
      setpagenum((prev) => prev + 1);
    });
  }

  useEffect(() => {
    setpagenum(1);
    fetchinidata();
  }, [query])

  return (
    <>
      <div className="searchResultsPage">
        {loading && <Spinner initial={true} />}
        {!loading && (
          <ContentWrapper>
            {maindata?.data?.results?.length > 0 ? (
              <>
                <div className="pageTitle">
                  {`Search ${maindata?.data?.total_results > 1 ? "results" : "result"} for '${query}'`}
                </div>
                <InfiniteScroll className='content' dataLength={maindata?.data?.results?.length || []} next={fetchnextpagedata} hasMore={pagenum <= maindata?.data?.total_pages} loader={<Spinner />} >
                  {maindata?.data?.results.map((val, index) => {
                    if (val.media_type === "person") return;
                    return (
                      <MovieCard key={index} data={val} />
                    )
                  })}
                </InfiniteScroll>
              </>
            ) : (
              <span className="resultNotFound">Sorry, Results Not Found!</span>
            )}
          </ContentWrapper>
        )}
      </div>
    </>
  )
}

export default Search
