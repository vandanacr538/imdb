import React, { useEffect, useRef, useState } from "react";
import "./moviecarousel.css";
import {
  Add,
  Bookmark,
  Close,
  Done,
  NavigateBefore,
  NavigateNext,
  PlayArrow,
  Star,
  StarBorderOutlined,
} from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../utils/interceptor";

export default function MovieCarousel(props) {
  const cardElement = useRef();
  const [moviesArr, setMoviesArr] = useState();
  const [movieDetailModal, setMovieDetailModal] = useState({});
  const [open, setOpen] = useState(false);
  const [keys, setKeys] = useState();
  const [watchlistItems, setWatchlistItems] = useState([]);
  const navigate = useNavigate();

  const handleClickBackward = () => {
    cardElement.current.scrollBy({
      top: 100,
      left: -1000,
      behavior: "smooth",
    });
  };
  const handleClickForward = () => {
    cardElement.current.scrollBy({
      top: 100,
      left: 1000,
      behavior: "smooth",
    });
  };
  const handleOpenMovieDetail = (element) => {
    setOpen(true);
    setMovieDetailModal(element);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  const getWatchlistItems = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/watchlist/mywatchlist"
      );
      setWatchlistItems(
        res.data.results.map((elem) => {
          return Number(elem.id);
        })
      );
    } catch (e) {
      console.log(e);
    }
  };
  const addToWatchlist = async (element) => {
    if (localStorage.getItem("token")) {
      try {
        const response = await axios.post(
          "http://localhost:8080/watchlist/addtowatchlist",
          element,
        );
        if (response.status === 200) {
          getWatchlistItems();
          // window.location.reload();
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      navigate("/signin");
    }
  };
  const removeFromWatchlist = async (element) => {
    try {
      const res = await axios.delete(
        "http://localhost:8080/watchlist/deletemoviefromwatchlist",
        {
          data: { element },
        }
      );
      if (res.status === 200) {
        getWatchlistItems();
        // window.location.reload();
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getMovieIds = (movieslistfromAPI) => {
    const getIds = movieslistfromAPI.map(async (element) => {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/" +
          element.id +
          "/videos?language=en-US",
      );
      return response.data;
    });
    // // getIds will be an array of promises
    // console.log(getIds);

    Promise.all(getIds).then((data) => {
      const final = data.map((element) => {
        return element.results.filter((filteredElement) => {
          return (
            filteredElement.type === "Trailer" &&
            filteredElement.name === "Official Trailer"
          );
        });
      });
      const movieKeysArr = final.map((elem) => {
        if (elem.length != 0) {
          if (elem[0].hasOwnProperty("key")) {
            return elem[0].key;
          }
        } else {
          return "random";
        }
      });
      // console.log(movieKeysArr);
      // console.log(movieKeysArr[1]);
      setKeys(movieKeysArr);
    });
  };
  const getMovies = async () => {
    if (props.auth === "own") {
      const res = await axios.get(props.api);
      getMovieIds(res.data.results);
      setMoviesArr(res.data.results);
    } else {
      const res = await axios.get(props.api);
      getMovieIds(res.data.results);
      setMoviesArr(res.data.results);
    }
  };
  useEffect(() => {
    getMovies();
    if (localStorage.getItem("token")) {
      getWatchlistItems();
    }
    window.addEventListener("scroll", () => {
      setOpen(false);
    });
  }, []);

  return (
    <div className="movie-carousel-main-container">
      <h2>{props.heading}</h2>
      <div className="carousel-container">
        <div className="cards" ref={cardElement}>
          {moviesArr ? (
            <>
              <button
                className="moviecar-nav moviecar-nav-left"
                onClick={handleClickBackward}
              >
                <NavigateBefore className="nav-icon" />
              </button>
              <button
                className="moviecar-nav moviecar-nav-right"
                onClick={handleClickForward}
              >
                <NavigateNext className="nav-icon" />
              </button>
              {moviesArr?.map((element, index) => {
                return (
                  <div key={index}>
                    <div className="card">
                      {watchlistItems?.includes(element.id) ? (
                        <div
                          className="overlay-icon"
                          onClick={() => {
                            removeFromWatchlist(element);
                          }}
                        >
                          <Bookmark className="overlay-bookmark-done" />
                          <div className="overlay-add-done-icon">
                            <Done style={{ color: "#000" }} />
                          </div>
                        </div>
                      ) : (
                        <div
                          className="overlay-icon"
                          onClick={() => {
                            addToWatchlist(element);
                          }}
                        >
                          <Bookmark className="overlay-bookmark-add" />
                          <div className="overlay-add-done-icon">
                            <Add />
                          </div>
                        </div>
                      )}
                      <img
                        src={
                          `https://image.tmdb.org/t/p/w185/` +
                          element.poster_path
                        }
                        className="movie-carousel-img"
                      ></img>
                      <div className="card-movie-details">
                        <div className="rating-container">
                          <div className="rating">
                            <p>
                              <Star
                                style={{ color: "#f5c518", marginRight: "5px" }}
                              />
                            </p>
                            <p>{element.vote_average}</p>
                          </div>
                          <Button>
                            <StarBorderOutlined style={{ fontSize: "20px" }} />
                          </Button>
                        </div>
                        <p className="card-movie-title">
                          {index + 1}. {element.original_title}
                        </p>
                        {watchlistItems?.includes(element.id) ? (
                          <Button
                            className="watchlist-btn"
                            onClick={() => {
                              removeFromWatchlist(element);
                            }}
                          >
                            <Done style={{ marginRight: "5px" }} />
                            Watchlist
                          </Button>
                        ) : (
                          <Button
                            className="watchlist-btn"
                            onClick={() => {
                              addToWatchlist(element);
                            }}
                          >
                            <Add style={{ marginRight: "5px" }} />
                            Watchlist
                          </Button>
                        )}
                        <div className="watch-trailer">
                          {keys?.map((keyElement, keyindex) => {
                            return (
                              <div key={keyindex}>
                                {keyindex === index && (
                                  <>
                                    {keyElement === "random" ? (
                                      <div className="no-trailer-btn"></div>
                                    ) : (
                                      <Button className="watch-trailer-btn">
                                        <PlayArrow
                                          style={{ marginRight: "5px" }}
                                        />
                                        <a
                                          href={
                                            "https://youtube.com/watch?v=" +
                                            keyElement
                                          }
                                          target="blank"
                                        >
                                          Trailer
                                        </a>
                                      </Button>
                                    )}
                                  </>
                                )}
                              </div>
                            );
                          })}
                          <Button
                            className="not-btn"
                            onClick={() => handleOpenMovieDetail(element)}
                          >
                            {"!"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="movie-carousel-loading">
              <CircularProgress
                style={{ color: "#888", width: "70px", height: "70px" }}
              />
            </div>
          )}
        </div>
        {Object.keys(movieDetailModal)?.map(() => {
          return (
            <div
              className={open ? "movie-detail-modal" : "no-movie-detail-modal"}
            >
              <div className="modal-close-icon" onClick={handleCloseModal}>
                <Close />
              </div>
              <div className="movie-detail-modal-content">
                <img
                  src={
                    `https://image.tmdb.org/t/p/w185/` +
                    movieDetailModal.poster_path
                  }
                  className="movie-detail-modal-img"
                ></img>
                <div className="movie-detail-modal-detail">
                  <h3 className="movie-detail-modal-heading">
                    {movieDetailModal.original_title}
                  </h3>
                  <p>Release Date: {movieDetailModal.release_date}</p>
                  <p>Language: {movieDetailModal.original_language}</p>
                  <div className="movie-detail-modal-rating">
                    <Star
                      style={{
                        color: "#f5c518",
                        fontSize: "17px",
                        marginRight: "5px",
                      }}
                    />
                    <p>{movieDetailModal.vote_average}/10</p>
                  </div>
                </div>
              </div>
              <p>{movieDetailModal.overview}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
