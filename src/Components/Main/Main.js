import React from "react";
import './main.css';
import { NavigateBefore, NavigateNext, PlayCircleOutline } from "@mui/icons-material";

export default function Main() {
  return (
    <div className="main-container">
      <div className="horizontal-carousel">
        <button className="carousel-nav carousel-nav-left">
            <NavigateBefore className="nav-icon"/>
        </button>
        <img src="https://m.media-amazon.com/images/M/MV5BZGVkNDAyM2EtYzYxYy00ZWUxLTgwMjgtY2VmODE5OTk3N2M5XkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_FMjpg_UX1000_.jpg"
        className="banner"></img>
        <div className="banner-details">
            <PlayCircleOutline sx={{fontSize:"40px"}}/>
            <h1 className="title">Iron man 4 coming to theaters near you, Watch a trailer now</h1>
        </div>
        <button className="carousel-nav carousel-nav-right">
            <NavigateNext className="nav-icon"/>
        </button>
      </div>
    </div>
  );
}
