import React, { useEffect, useRef, useState } from "react";
import "./moviecarousel.css";
import {
  Add,
  Bookmark,
  Done,
  NavigateBefore,
  NavigateNext,
  PlayArrow,
  Star,
  StarBorderOutlined,
} from "@mui/icons-material";
import { Box, Button, Modal, Rating, Typography } from "@mui/material";
import axios from "axios";

export default function MovieCarousel(props) {
  const cardElement=useRef();
  const [moviesArr, setMoviesArr] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState(0);
  const [keys, setKeys]=useState();
  const [watchlistItems, setWatchlistItems] = useState([]);

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

  const addToWatchlist=async(element)=>{
    try{
      const response=await axios.post("http://localhost:8080/watchlist/addtowatchlist", element,
      {
        headers:{
          Authorization:localStorage.getItem("token"),
        },
      }
      );
      if(response.status===200){
        window.location.reload();
      }
    }
    catch(e){
      console.log(e);
    }
  }
  const removeFromWatchlist=async(element)=>{
    try{
      const res = await axios.delete(
        "http://localhost:8080/watchlist/deletemoviefromwatchlist", 
        { data: { element }, 
          headers: {
            Authorization:localStorage.getItem("token"),
          }, 
        }
      );
      if(res.status===200){
        getWatchlistItems();
        window.location.reload();
      }
    }
    catch(e){
      console.log(e);
    }
    
  }
  const getWatchlistItems=async()=>{
    try{
      const res = await axios.get(
        "http://localhost:8080/watchlist/mywatchlist",
        {
          headers: {
            Authorization:localStorage.getItem("token"),
          },
        }
      );
      setWatchlistItems(res.data.results.map((elem)=>{
        return Number(elem.id);
      }))
    }
    catch(e){
      console.log(e);
    }
  }
  const getMovies = async () => {
    if(props.auth==="own"){
      const res = await axios.get(
        props.api,
        {
          headers: {
            Authorization:localStorage.getItem("token"),
          },
        }
      );
      setMoviesArr(res.data.results);
    }
    else{
      const res = await axios.get(
        props.api,
        {
          headers: {
            Authorization:
              "Bearer " +
              "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNjhhYWU0YzYyNzFlNmNmZjUzODNlMGU5YjM3ZTRlYyIsInN1YiI6IjY0Y2U2YWY1NmQ0Yzk3MDBjYjdkYjg0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0exlYdltt0_hYnHKl7FexczP3qg_sChBIeCZypZXsT0",
          },
        }
      );
      setMoviesArr(res.data.results);

      const getIds=res.data.results.map(async(element)=>{
        const response=await axios.get("https://api.themoviedb.org/3/movie/" +element.id+ "/videos?language=en-US",
        {
          headers:{
            Authorization:
            "Bearer "+
            "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNjhhYWU0YzYyNzFlNmNmZjUzODNlMGU5YjM3ZTRlYyIsInN1YiI6IjY0Y2U2YWY1NmQ0Yzk3MDBjYjdkYjg0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0exlYdltt0_hYnHKl7FexczP3qg_sChBIeCZypZXsT0"
          },
        });
        return response.data;
      }); 
      // getIds will be an array of promises
      // console.log(getIds);

      Promise.all(getIds).then((data)=>{
        const final=data.map((element)=>{
          return element.results.filter((filteredElement)=>{
            return filteredElement.type==="Trailer" && filteredElement.name==="Official Trailer";
          });
        });
        const movieKeysArr=final.map((elem)=>{
          if(elem.length!=0){
            if(elem[0].hasOwnProperty("key")){
              return elem[0].key;
            }
          }
          else{
            return "random";
          }
        });
        // console.log(movieKeysArr);
        // console.log(movieKeysArr[1]);
        setKeys(movieKeysArr);
      });

    }
  };
  useEffect(() => {
    getMovies();
    if(localStorage.getItem("token")){
      getWatchlistItems();
    }
  }, []);

  return (
    <div className="movie-carousel-main-container">
      <h2>{props.heading}</h2>
      <div className="carousel-container">
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
        <div className="cards" ref={cardElement}>
          {moviesArr?.map((element, index) => {
            return (
              <>
                <div className="card">
                  {watchlistItems?.includes(element.id) ? (
                    <div className="overlay-icon" onClick={() => {removeFromWatchlist(element);}}>
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
                  <img src={`https://image.tmdb.org/t/p/w185/` + element.poster_path}></img>
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
                      <Button onClick={handleOpen}>
                        <StarBorderOutlined style={{ fontSize: "20px" }} />
                      </Button>
                    </div>
                    <p className="card-movie-title">{index+1}. {element.original_title}</p>
                    <Button className="watchlist-btn">
                      <Add style={{ marginRight: "5px" }} />
                      Watchlist
                    </Button>
                    <div className="watch-trailer">
                      <Button className="watch-trailer-btn">
                        <PlayArrow style={{ marginRight: "5px" }} />
                        {keys?.map((keyElement,keyindex) => {
                          return (
                            <>
                            {keyindex===index &&
                                <a href={"https://youtube.com/watch?v=" + keyElement}>Trailer</a>
                            }
                            </>
                          );
                        })}
                      </Button>
                      <Button className="not-btn">{"!"}</Button>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box className="rating-modal">
          <Star className="rating-star" />
          <span className="rating-star-value">{value}</span>
          <p className="rating-modal-heading">RATE THIS</p>
          <p>Oppenheimer</p>
          <Rating
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
              console.log(value);
            }}
          />
          <button className="rate-btn">Rate</button>
        </Box>
      </Modal>
    </div>
  );
}
