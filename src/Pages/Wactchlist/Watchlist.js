import React, { useEffect, useState } from "react";
import "./watchlist.css";
import { Add, Bookmark, Done, Star } from "@mui/icons-material";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import "../../utils/interceptor";

export default function Watchlist(props) {
  const [watchlistPageArr, setWatchlistPageArr] = useState();
  const [trailerVideoKey, setTrailerVideoKey] = useState();

  const getYourWatchlist = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/watchlist/mywatchlist"
      );
      setWatchlistPageArr(res.data.results);
      props.setWatchlistMoviesCount(res.data.results.length);
      const getIds = res.data.results.map(async (element) => {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/" +
            element.id +
            "/videos?language=en-US"
        );
        return response.data;
      });
      Promise.all(getIds).then((data) => {
        const final = data.map((element) => {
          return element.results.filter((filteredElement) => {
            return (
              filteredElement.type === "Trailer" &&
              (filteredElement.name === "Official Trailer" ||
                filteredElement.name === "Official US Trailer")
            );
          });
        });
        const movieKeysArr = final.map((elem) => {
          if (elem.length !== 0) {
            if (elem[0].hasOwnProperty("key")) {
              return elem[0].key;
            }
          } else {
            return "random";
          }
        });
        setTrailerVideoKey(movieKeysArr);
      });
    } catch (e) {
      console.log(e);
    }
  };
  const removeFromWatchlist=async(element)=>{
    try{
      const res = await axios.delete(
        "http://localhost:8080/watchlist/deletemoviefromwatchlist", 
        { data: { element } 
        }
      );
      if(res.status===200){
        getYourWatchlist();
        props.setWatchlistMoviesCount(watchlistPageArr.length);
      }
    }
    catch(e){
      console.log(e);
    } 
  }
  useEffect(() => {
    if(localStorage.getItem("token")){
      getYourWatchlist();
    }
  }, [props.watchlistMoviesCount]);
  return (
    <div className="watchlist-page">
      <div className="watchlist-page-box">
        <h2>Your Watchlist</h2>
        <hr id="watchlist-page-bar"></hr>
        <div className="watchlist-page-container">
          {watchlistPageArr ? (
            <>
              {watchlistPageArr.length > 0 ? (
                <>
                  {watchlistPageArr.map((element, index) => {
                    return (
                      <div className="watchlist-cards" key={index}>
                        <div className="watchlist-page-overlay-icon-box" onClick={() => {removeFromWatchlist(element);}}>
                          <Bookmark className="watchlist-page-overlay-done-bookmark" />
                          <div className="watchlist-page-overlay-icon">
                            <Done style={{ fontSize: "18px", color: "#fff" }} />
                          </div>
                        </div>
                        <img
                          src={
                            `https://image.tmdb.org/t/p/w185/` +
                            element.poster_path
                          }
                          alt={element.original_title}
                          className="movie-img-in-wacthlist-page"
                        ></img>
                        <div className="watchlist-card-details">
                          {trailerVideoKey?.map(
                            (trailerElement, trailerIndex) => {
                              return (
                                <div key={trailerIndex}>
                                  {trailerIndex === index && (
                                    <a
                                      href={
                                        "https://youtube.com/watch?v=" +
                                        trailerElement
                                      }
                                      target="blank"
                                      className="watchlist-card-heading"
                                    >
                                      {element.original_title}
                                    </a>
                                  )}
                                </div>
                              );
                            }
                          )}
                          <p className="watchlist-card-release-date">
                            Release Date:{" "}
                            {element.release_date.substring(0, 10)}
                          </p>
                          <div className="rating-in-watchlist-page">
                            <p>
                              <Star
                                style={{
                                  color: "#f5c518",
                                  marginRight: "5px",
                                  fontSize: "14px",
                                }}
                              />
                            </p>
                            <p>{element.vote_average}</p>
                          </div>
                          <p>{element.overview}</p>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <div className="empty-watchlist-page-content">
                  <div className="watchlist-add-icon-box">
                    <Bookmark className="watchlist-add-icon-bookmark" />
                    <div className="watchlist-add-icon">
                      <Add style={{ fontSize: "40px", color: "#fff" }} />
                    </div>
                  </div>
                  <h4>Your Watchlist is empty</h4>
                  <p id="empty-watchlist-description">
                    Add movies and shows to your Watchlist to keep track of what
                    you want to watch.
                  </p>
                  <a href="" className="wactchlist-page-browse-link">
                    Browse Popular movies
                  </a>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="watchlist-page-loading">
                <CircularProgress
                  style={{ color: "#888", width: "70px", height: "70px" }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
