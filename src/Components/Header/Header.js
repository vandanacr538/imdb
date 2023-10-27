import React, { useEffect, useRef, useState } from "react";
import "./header.css";
import { Box, Button, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  AccountCircle,
  ArrowDropDown,
  BookmarkAdd,
  LocalMovies,
  Menu,
  People,
  Public,
  Search,
  StarsRounded,
  Tv,
  VideoLibrary,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";
import axios from "axios";
import "../../utils/interceptor";
let historyItems=[];

export default function Header(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [userProfileData, setUserProfileData]=useState("");
  const [userDropDown, setUserDropDown]=useState(false);
  const {watchlistMoviesCount, setWatchlistMoviesCount} = props;
  const [allMoviesList, setAllMoviesList] = useState();
  const [searchOutputArr, setSearchOutputArr] = useState([]);
  const [noSearchData, setNoSearchData] = useState(false);
  const closeUserDropDown = useRef();
  const navigate=useNavigate();
  const gotoHome=()=>{
    navigate("/");
  }
  const getAllMoviesList=async()=>{
    const res = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1"
    );
    setAllMoviesList(res.data.results);
  }
  const searchMovie=async(e)=>{
    setNoSearchData(false);
    setSearchOutputArr([]);
    if(e.target.value===""){
      return;
    }
    else{
      const searchedData=allMoviesList.filter((element)=>{
        return element.original_title.toString().toUpperCase().includes(e.target.value.toString().toUpperCase());
      });
      if(searchedData.length>0){
        setSearchOutputArr(searchedData);
      }
      else{
        setNoSearchData(true);
      }
    }
  }
  const debounce=(func, timeout)=>{
    let timer;
    return function(...args){
        clearTimeout(timer);
        timer=setTimeout(()=>{
            func.apply(this, args);
        }, timeout)
    }
  }
  const handleChangeSearch=debounce(searchMovie, 300);
  const handleClickVideo=(elem)=>{
    if(Cookies.get("history")){
      const oldItems=JSON.parse(Cookies.get("history"));
      historyItems.push(...oldItems, {poster_path:elem.poster_path});
    }
    else{
      historyItems.push({poster_path:elem.poster_path});
      console.log(historyItems)
    }
    Cookies.set("history", JSON.stringify(historyItems));
    navigate("/play/" + elem.id);
    setNoSearchData(false);
    setSearchOutputArr([]);
    document.querySelector(".search-input").value="";
  }
  const getWatchlistCount=async()=>{
    try{
      const res = await axios.get(
        "http://localhost:8080/watchlist/mywatchlist"
      );
      console.log(res.data.results.length);
      setWatchlistMoviesCount(res.data.results.length);
    }
    catch(e){
      console.log(e);
    }
  }
  const gotoWatchlistPage=()=>{
    if(localStorage.getItem("token")){
      navigate("/watchlist");
    }
    else{
      navigate("/login");
    }
  }
  const gotoSignInPage=()=>{
    if(localStorage.getItem("token")===null){
      navigate("/login");
    }
  }
  const signOut=(event)=>{
    event.stopPropagation();
    if(localStorage.getItem("token")){
      localStorage.removeItem("token");
      setUserDropDown(!userDropDown);
      Cookies.remove("history");
      navigate("/");
      window.location.reload();
    }
  }
  const getUserData=async()=>{
    try{
      const result = await axios.post("http://localhost:8080/createaccount/getuserprofiledata");
      setUserProfileData(decodeToken(result.data.token));
    }
    catch(e){
      console.log(e);
    }
  }
  const handleClickUserDropDown=(e)=>{
    if(closeUserDropDown.current.contains(e.target)){
      setUserDropDown((previous)=>!previous);
    }
    else{
      setUserDropDown(false);
    }
  }
  useEffect(()=>{
    if(localStorage.getItem("token")){
      document.addEventListener("click", handleClickUserDropDown);
    }
  }, []);
  useEffect(()=>{
    if(localStorage.getItem("token")){
      getUserData();
      getWatchlistCount();
    }
    getAllMoviesList();
  }, [props.authButton])

  return (
    <div>
      <header>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
          alt="imdblogo"
          className="imdblogo"
          onClick={gotoHome}
        />
        <div>
          <Button onClick={handleOpen} className="header-btn">
            <Menu/>
            <span className="header-btn-text">Menu</span>
          </Button>
          <Modal open={open} onClose={handleClose}>
            <Box className="menu-box">
              <div className="menu-box-header">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
                  alt="imdblogo"
                  className="imdblogo-in-modal"
                />
                <span className="close-icon" onClick={() => setOpen(false)}>
                  <CloseIcon />
                </span>
              </div>
              <div className="menu-box-body">
                <div className="menu-box-container">
                  <div className="menu-heading">
                    <div className="menu-icon">
                      <LocalMovies />
                    </div>
                    <h2>Movies</h2>
                  </div>
                  <div className="menu-links-container">
                    <p className="menu-links">Release Calender</p>
                    <p className="menu-links">Top 250 Movies</p>
                    <p className="menu-links">Most Popular Movies</p>
                    <p className="menu-links">Browse Movies by Genre</p>
                    <p className="menu-links">Top Box Office</p>
                    <p className="menu-links">Showtimes & Tickets</p>
                    <p className="menu-links">Movie News</p>
                    <p className="menu-links">India Movie Spotlight</p>
                  </div>
                </div>
                <div className="menu-box-container">
                  <div className="menu-heading">
                    <div className="menu-icon">
                      <Tv />
                    </div>
                    <h2>TV Shows</h2>
                  </div>
                  <div className="menu-links-container">
                    <p className="menu-links">What's on TV & Streaming</p>
                    <p className="menu-links">Top 250 TV Shows</p>
                    <p className="menu-links">Most Popular TV Shows</p>
                    <p className="menu-links">Browse TV Shows by Genre</p>
                    <p className="menu-links">TV News</p>
                  </div>
                </div>
                <div className="menu-box-container">
                  <div className="menu-heading">
                    <div className="menu-icon">
                      <VideoLibrary />
                    </div>
                    <h2>Watch</h2>
                  </div>
                  <div className="menu-links-container">
                    <p className="menu-links">What to Watch</p>
                    <p className="menu-links">Latest Trailers</p>
                    <p className="menu-links">IMDb Originals</p>
                    <p className="menu-links">IMDb Picks</p>
                    <p className="menu-links">IMDb Podcasts</p>
                  </div>
                </div>
                <div className="menu-box-container">
                  <div className="menu-heading">
                    <div className="menu-icon">
                      <StarsRounded />
                    </div>
                    <h2>Awards & Events</h2>
                  </div>
                  <div className="menu-links-container">
                    <p className="menu-links">Oscars</p>
                    <p className="menu-links">Emmys</p>
                    <p className="menu-links">Hallowen Picks</p>
                    <p className="menu-links">Scary Good Horror</p>
                    <p className="menu-links">Hispanic Heritage Month</p>
                    <p className="menu-links">MAMI</p>
                    <p className="menu-links">All Events</p>
                  </div>
                </div>
                <div className="menu-box-container">
                  <div className="menu-heading">
                    <div className="menu-icon">
                      <People />
                    </div>
                    <h2>Celebs</h2>
                  </div>
                  <div className="menu-links-container">
                    <p className="menu-links">Born Today</p>
                    <p className="menu-links">Most Popular Celebs</p>
                    <p className="menu-links">Celebrity News</p>
                  </div>
                </div>
                <div className="menu-box-container">
                  <div className="menu-heading">
                    <div className="menu-icon">
                      <Public />
                    </div>
                    <h2>Community</h2>
                  </div>
                  <div className="menu-links-container">
                    <p className="menu-links">Help Center</p>
                    <p className="menu-links">Contributor Zone</p>
                    <p className="menu-links">Polls</p>
                  </div>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
        <div className="search-container">
          <div className="search-box">
            <input
              className="search-input"
              type="text"
              placeholder="Search IMDb"
              onKeyUp={handleChangeSearch}
            ></input>
            <Search sx={{ cursor: "pointer", color: "#5c5a5a" }} />
          </div>
            {searchOutputArr.length>0?(
              <div class="search-output">
                {searchOutputArr?.map((element)=>{
                  return (
                  <div className="search-output-card" onClick={()=>handleClickVideo(element)}>
                    <img src={`https://image.tmdb.org/t/p/w185/` + element.poster_path} className="img-search-output"></img>
                    <div>
                     <p>{element.original_title}</p>
                     <p>{element.overview}</p>
                    </div>
                  </div>
                  )
                })}
              </div>
            ):(<div id='no-data-found' style={{display:noSearchData?"block":""}}><p>No data found!</p></div>)}
        </div>
        <Button className="header-btn" onClick={gotoWatchlistPage}>
          <BookmarkAdd/>
          <span className="header-btn-text">Watchlist
            {watchlistMoviesCount > 0 ? (
              <span className="wachlist-count-in-header">{watchlistMoviesCount}</span>
            ) : (
              <></>
            )}
          </span>
        </Button>
        <Button className="header-btn" 
        onClick={gotoSignInPage} 
        ref={closeUserDropDown}>
          {props.authButton ? (
            <>
              <AccountCircle />
              <span className="header-btn-text">{userProfileData.name}</span>
              <ArrowDropDown/>
              <div className={userDropDown ? "user-profile-dropdown" : "no-user-profile-dropdown"} id="user-dropdown">
                <label>
                  <ul>
                    <li onClick={()=>navigate("/accountsettings")}>Account Settings</li>
                    <li onClick={signOut}>Sign Out</li>
                  </ul>
                </label>
              </div>
            </>
          ) : (
            <span>Sign In</span>
          )}
        </Button>
        <select className="select-language">
          <option>English</option>
        </select>
      </header>
    </div>
  );
}
