import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchData } from '../../utils/api';
import useFetch from '../../hooks/useFetch';
import ContentWrapper from '../../components/contentwrapper/ContentWrapper'
import Spinner from '../../components/spinner/Spinner'
import MovieCard from '../../components/moviecard/MovieCard';
import Select from "react-select";
import InfiniteScroll from 'react-infinite-scroll-component';
import './style.scss';

let filters = {};

const sortByData = [
  { value: "popularity.desc", label: "Popularity(top to down)" },
  { value: "popularity.asc", label: "Popularity(down to top)" },
  { value: "vote_average.desc", label: "Rating(top to down)" },
  { value: "vote_average.asc", label: "Rating(down to top)" },
  { value: "primary_release_date.desc", label: "Release Date(top to down)" },
  { value: "primary_release_date.asc", label: "Release Date(down to top)" },
  { value: "original_title.asc", label: "Title (A - Z)" },
]

const Explore = () => {

  const [maindata, setmaindata] = useState(null);
  const [pagenum, setpagenum] = useState(1);
  const [loading, setloading] = useState(false);
  const [category, setcategory] = useState(null);
  const [sortBy, setsortBy] = useState(null);
  const { mediaType } = useParams();

  const { data } = useFetch(`genre/${mediaType}/list`);

  const fetchinidata = () => {
    setloading(true)
    fetchData(`/discover/${mediaType}`, filters).then((res) => {
      setmaindata(res);
      setpagenum((prev) => prev + 1);
      setloading(false)
    }) 
  };
 
  const fetchnextpagedata = () => {
    fetchData(`/discover/${mediaType}?page=${pagenum}`, filters).then((res) => {
      if (maindata?.data?.results) {
        setmaindata({
          ...maindata, results: [...maindata?.data?.results, ...res?.data?.results]
        })
      } else {
        setmaindata(res?.data)
      }
      setpagenum((prev) => prev + 1);
    });
  };

  useEffect(() => {
    fetchinidata();
    filters = {};
    setmaindata(null);
    setpagenum(1);
    setsortBy(null);
    setcategory(null);
  }, [mediaType])

  const onChange = (selectedItems, action) => {
    if (action.name === "sortBy") {
      setsortBy(selectedItems);
      if (action.action !== "clear") {
        filters.sort_by = selectedItems.value;
      } else {
        delete filters.sort_by;
      }
    }

    if (action.name === "genres") {
      setcategory(selectedItems);
      if (action.action !== "clear") {
        let genreId = selectedItems.map((g) => g.id);
        genreId = JSON.stringify(genreId).slice(1, -1);
        filters.with_genres = genreId
      }
    }
    setpagenum(1);
    fetchinidata();
  }

  return (
    <>
      <div className="explorePage">
        <ContentWrapper>
          <div className="pageHeader">
            <div className="pageTitle">
              {mediaType === "tv"
                ? "Explore TV Shows"
                : "Explore Movies"}
            </div>
            <div className="filters">
              <Select
                isMulti
                name="genres"
                value={category}
                closeMenuOnSelect={false}
                options={filters.with_genres}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                onChange={onChange}
                placeholder="Select Category"
                className="react-select-container genresDD"
                classNamePrefix="react-select"
              />
              <Select
                name="sortby"
                value={sortBy}
                options={sortByData}
                onChange={onChange}
                isClearable={true}
                placeholder="Sort by"
                className="react-select-container sortbyDD"
                classNamePrefix="react-select"
              />
            </div>
          </div>
          {loading && <Spinner initial={true} />}
          {!loading && (
            <>
              {maindata?.data?.results?.length > 0 ? (
                <InfiniteScroll
                  className="content"
                  dataLength={maindata?.data?.results?.length || []}
                  next={fetchnextpagedata}
                  hasMore={pagenum <= maindata?.data?.total_pages}
                  loader={<Spinner />}
                >
                  {maindata?.data?.results?.map((item, index) => {
                    if (item.media_type === "person") return;
                    return (
                      <MovieCard
                        key={index}
                        data={item}
                        mediaType={mediaType}
                      />
                    );
                  })}
                </InfiniteScroll>
              ) : (
                <span className="resultNotFound">
                  Sorry, Results not found!
                </span>
              )}
            </>
          )}
        </ContentWrapper>
      </div>
    </>
  )
}

export default Explore
