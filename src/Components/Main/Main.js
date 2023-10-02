import React, { useEffect, useState } from "react";
import "./main.css";
import {
  NavigateBefore,
  NavigateNext,
  PlayCircleOutline,
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
let historyItems=[];
export default function Main() {
  let myTimeout;
  const [moviesArr, setMoviesArr] = useState([]);
  const [currentMovie, setCurrentMovie] = useState({});
  const [i, setI]=useState(1);
  const navigate=useNavigate();
  const [bannerUpdate, setBannerUpdate]=useState(true);

  const autoUpdate=()=>{
    if(moviesArr.length>0){
      if(moviesArr.indexOf(currentMovie) === moviesArr.length - 1){
        setCurrentMovie(moviesArr[0]);
        setI(1);
      }
      else if(moviesArr.indexOf(currentMovie) === moviesArr.length - 2){
        setCurrentMovie(moviesArr[moviesArr.indexOf(currentMovie) + 1]);
        setI(0);
      }
      else{
        setCurrentMovie(moviesArr[moviesArr.indexOf(currentMovie) + 1]);
        setI(moviesArr.indexOf(currentMovie)+2);
      }
    }
  }

  const handleClickForward = () => {
    setBannerUpdate(false);
    setBannerUpdate((state) => {
        console.log("value is", state); 
        clearTimeout(myTimeout);
        return state;
    });
    if (moviesArr.indexOf(currentMovie) === moviesArr.length - 1) {
      setCurrentMovie(moviesArr[0]);
      setI(1);
    }
    else if(moviesArr.indexOf(currentMovie) === moviesArr.length - 2){
      setCurrentMovie(moviesArr[moviesArr.indexOf(currentMovie) + 1]);
      setI(0);
    }
    else {
      setCurrentMovie(moviesArr[moviesArr.indexOf(currentMovie) + 1]);
      setI(moviesArr.indexOf(currentMovie)+2);
    }
  };

  const handleClickBackward = () => {
    setBannerUpdate(false);
    setBannerUpdate((state)=>{
      clearTimeout(myTimeout);
      console.log("value updated:"+state);
      return state;
    });
    if (moviesArr.indexOf(currentMovie) === 0) {
      setCurrentMovie(moviesArr[moviesArr.length - 1]);
      setI(0);
    } 
    else if(moviesArr.indexOf(currentMovie) === 1){
      setCurrentMovie(moviesArr[moviesArr.indexOf(currentMovie) - 1]);
      setI(1);
    }
    else {
      setCurrentMovie(moviesArr[moviesArr.indexOf(currentMovie) - 1]);
      setI(moviesArr.indexOf(currentMovie));
    }
  };

  const handleClickVideo=(elem)=>{
    if(Cookies.get("history")){
      const oldItems=JSON.parse(Cookies.get("history"));
      // historyItems=[...oldItems]
      // historyItems.push(elem);
      historyItems.push(...oldItems, {poster_path:elem.poster_path});
    }
    else{
      historyItems.push({poster_path:elem.poster_path});
      console.log(historyItems)
    }
    Cookies.set("history", JSON.stringify(historyItems));
    navigate("/play/" + elem.id);
  }

  const getMovies = async () => {
    const res = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      {
        headers: {
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNjhhYWU0YzYyNzFlNmNmZjUzODNlMGU5YjM3ZTRlYyIsInN1YiI6IjY0Y2U2YWY1NmQ0Yzk3MDBjYjdkYjg0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0exlYdltt0_hYnHKl7FexczP3qg_sChBIeCZypZXsT0",
        },
      }
    );
    setMoviesArr(res.data.results);
    setCurrentMovie(res.data.results[0]);
    console.log(res);
  };

  useEffect(() => {
    if(bannerUpdate===true){
      myTimeout = setTimeout(autoUpdate, 3000);
    }
  }, [moviesArr, currentMovie]); // we can use currentMovie.poster_path instead of currentMovie

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="main-container">
      <div className="horizontal-carousel">
        <button
          className="carousel-nav carousel-nav-left"
          onClick={handleClickBackward}
        >
          <NavigateBefore className="nav-icon" />
        </button>
        <img src={`https://image.tmdb.org/t/p/w1280/` + currentMovie.poster_path} className="horizontal-banner"></img>
        <div className="horizontal-banner-details">
          <a href="" className="video-link">
            <PlayCircleOutline sx={{ fontSize: "60px" }} onClick={()=>handleClickVideo(currentMovie)}/>
          </a>
          <h1 className="horizontal-banner-title">{currentMovie.title}</h1>
        </div>
        <button
          className="carousel-nav carousel-nav-right"
          onClick={handleClickForward}
        >
          <NavigateNext className="nav-icon" />
        </button>
      </div>
      <div className="vertical-carousel">
        <h3>Up next</h3>
        <div className="vertical-movies-box">
          {moviesArr.slice(i, moviesArr.length)
            .filter((element, index) => index < 3)
            .map((element) => {
              return (
                <>
                  <div className="vertical-movies">
                    <div className="vertical-m-banner">
                      <img src={`https://image.tmdb.org/t/p/w92/` + element.poster_path}></img>
                    </div>
                    <div className="vertical-m-details">
                      <a href="" className="video-link">
                        <PlayCircleOutline sx={{ fontSize: "40px" }} />
                      </a>
                      <p>{element.original_title}</p>
                      <p>Release on {element.release_date}</p>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
        <h3>Browse trailers{" >"}</h3>
      </div>
    </div>
  );
}
