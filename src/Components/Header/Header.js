import React, { useEffect, useState } from "react";
import "./header.css";
import { Box, Button, MenuItem, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  BookmarkAdd,
  LocalMovies,
  Menu,
  People,
  Public,
  Search,
  Star,
  StarsRounded,
  Tv,
  VideoLibrary,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Header(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate=useNavigate();

  const gotoHome=()=>{
    navigate("/");
  }

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
                    <p className="menu-links">Item1</p>
                    <p className="menu-links">Item2</p>
                    <p className="menu-links">Item3</p>
                    <p className="menu-links">Item4</p>
                    <p className="menu-links">Item5</p>
                    <p className="menu-links">Item6</p>
                    <p className="menu-links">Item7</p>
                    <p className="menu-links">Item8</p>
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
                    <p className="menu-links">Item1</p>
                    <p className="menu-links">Item2</p>
                    <p className="menu-links">Item3</p>
                    <p className="menu-links">Item4</p>
                    <p className="menu-links">Item5</p>
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
                    <p className="menu-links">Item1</p>
                    <p className="menu-links">Item2</p>
                    <p className="menu-links">Item3</p>
                    <p className="menu-links">Item4</p>
                    <p className="menu-links">Item5</p>
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
                    <p className="menu-links">Item1</p>
                    <p className="menu-links">Item2</p>
                    <p className="menu-links">Item3</p>
                    <p className="menu-links">Item4</p>
                    <p className="menu-links">Item5</p>
                    <p className="menu-links">Item6</p>
                    <p className="menu-links">Item7</p>
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
                    <p className="menu-links">Item1</p>
                    <p className="menu-links">Item2</p>
                    <p className="menu-links">Item3</p>
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
                    <p className="menu-links">Item1</p>
                    <p className="menu-links">Item2</p>
                    <p className="menu-links">Item3</p>
                  </div>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
        <div className="search-container">
          <select className="search-select">
            <option>All</option>
            <option>Titles</option>
            <option>TV Episodes</option>
          </select>
          <div className="search-box">
            <input
              className="search-input"
              type="text"
              placeholder="Search IMDb"
            ></input>
            <Search sx={{ cursor: "pointer", color: "#5c5a5a" }} />
          </div>
        </div>
        <Button className="header-btn">
          <BookmarkAdd/>
          <span className="header-btn-text">Watchlist</span>
        </Button>
        <Button className="header-btn"
        onClick={()=>{
          if(localStorage.getItem("token")){
            localStorage.removeItem("token");
            Cookies.remove("history");
            window.location.reload();
          }
          else{
            navigate("/login");
          }
        }}>{props.authButton}</Button>
        <select className="select-language">
          <option>English</option>
          <option>Italiano</option>
        </select>
      </header>
    </div>
  );
}
