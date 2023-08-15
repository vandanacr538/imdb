import React, { useEffect, useState } from "react";
import "./main.css";
import {
  NavigateBefore,
  NavigateNext,
  PlayCircleOutline,
} from "@mui/icons-material";
import axios from "axios";

export default function Main() {
  const [moviesArr, setMoviesArr] = useState([]);
  const [currentMovie, setCurrentMovie] = useState({});

  const handleClickForward = () => {
    if (moviesArr.indexOf(currentMovie) === moviesArr.length - 1) {
      setCurrentMovie(moviesArr[0]);
    } else {
      setCurrentMovie(moviesArr[moviesArr.indexOf(currentMovie) + 1]);
    }
  };
  const handleClickBackward = () => {
    if (moviesArr.indexOf(currentMovie) === 0) {
      setCurrentMovie(moviesArr[moviesArr.length - 1]);
    } else {
      setCurrentMovie(moviesArr[moviesArr.indexOf(currentMovie) - 1]);
    }
  };

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
            <PlayCircleOutline sx={{ fontSize: "60px" }} />
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
          {moviesArr
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
