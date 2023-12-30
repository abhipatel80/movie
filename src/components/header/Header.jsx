import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ContentWrapper from '../contentwrapper/ContentWrapper';
import { HiOutlineSearch } from 'react-icons/hi';
import { VscChromeClose } from 'react-icons/vsc';
import { SlMenu } from 'react-icons/sl';
import logo from '../../assets/movix-logo.svg';
import './style.scss';

const header = () => {

  const [show, setshow] = useState("top");
  const [lastScrollY, setlastScrollY] = useState(0);
  const [mobileMenu, setmobileMenu] = useState(false);
  const [input, setinput] = useState("");
  const [showSearch, setshowSearch] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location])

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        if (window.scrollY > lastScrollY && !mobileMenu) {
          setshow("hide")
        } else {
          setshow("show")
        }
      }
      setlastScrollY(window.scrollY)
      return () => {
        window.removeEventListener("scroll", () => {

        })
      }
    })
  }, [lastScrollY])

  const openSearch = () => {
    setmobileMenu(false)
    setshowSearch(true)
  }

  const openMobileMenu = () => {
    setmobileMenu(true)
    setshowSearch(false)
  }

  const navigatehandle = (type) => {
    if (type === "movie") {
      navigate('/explore/movie')
    } else {
      navigate('/explore/tv')
    }
    setmobileMenu(false)
  }

  const change = (e) => {
    if (e.key === "Enter" && input.length > 0) {
      navigate(`/search/${input}`)
      setTimeout(() => {
        setshowSearch(false)
      }, 1000);
    }
  }

  return (
    <header className={`header ${mobileMenu ? 'mobileView' : ''} ${show}`}>
      <ContentWrapper>
        <div className="contentWrapper">
          <div className="logo" onClick={() => navigate('/')} >
            <img src={logo} alt="logo" />
          </div>
          <ul className="menuItems left">
            <li className="menuItem" onClick={() => navigatehandle('movie')}>Movies</li>
            <li className="menuItem" onClick={() => navigatehandle('tv')}>TV Shows</li>
            <li className="menuItem"><HiOutlineSearch onClick={openSearch} /></li>
          </ul>
          <div className="mobileMenuItems">
            <HiOutlineSearch onClick={openSearch} />
            {mobileMenu ? <VscChromeClose className='searchicon' onClick={() => setmobileMenu(false)} /> : <SlMenu onClick={openMobileMenu} />}
          </div>
        </div>
      </ContentWrapper>
      {showSearch && (<div className="searchBar">
        <ContentWrapper>
          <div className="searchinput">
            <input type="text" onChange={(e) => setinput(e.target.value)} value={input} onKeyUp={change} placeholder='Search for movies or Tv shows...' />
            <VscChromeClose className='searchicon' onClick={() => setshowSearch(false)} />
          </div>
        </ContentWrapper>
      </div>)}
    </header>
  )
}

export default header
