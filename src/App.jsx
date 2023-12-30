import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Search from './pages/search/Search'
import Explore from './pages/explore/Explore'
import Error from './pages/404/Error'
import Details from './pages/details/Details'
import Header from './components/header/Header'
import './App.css'
import { fetchData } from './utils/api'
import { useEffect } from 'react'
import { getapicatedata, getapidata } from './store/homeSlice'
import Footer from './components/footer/Footer'

const App = () => {

  const dispatch = useDispatch();

  const fetchapiconfig = () => {
    fetchData("/configuration").then((res) => {
      const url = {
        backdrop: res.data.images.secure_base_url + "original",
        poster: res.data.images.secure_base_url + "original",
        profile: res.data.images.secure_base_url + "original",
      }
      dispatch(getapidata(url))
    })
  }

  const categorydata = async () => {
    let promises = []
    let endpoints = ["tv", "movie"]
    let allcategory = []

    endpoints.forEach((url) => {
      promises.push(fetchData(`/genre/${url}/list`))
    });

    const data = await Promise.all(promises);
    data?.map((val) => {
      const totaldata = val.data.genres
      return totaldata?.map((item) => (allcategory[item.id] = item))
    })
    dispatch(getapicatedata(allcategory))
  }

  useEffect(() => {
    fetchapiconfig();
    categorydata()
  }, [])

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="/search/:query" element={<Search />} />
          <Route path="/explore/:mediaType" element={<Explore />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
