import { AddBox } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./protectedlayout.css";
import axios from "axios";
import "../../utils/interceptor";

export default function ProtectedLayout() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [mywatchlist, setMyWatchlist] = useState([]);
  const navigate = useNavigate();

  const exploreMovies = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: document.querySelector("#explore").offsetTop,
      behavior: "smooth",
    });
  };
  const checkMyWachlist = async () => {
    try{
      const res = await axios.get("https://imdb-backend-gc2o.onrender.com/watchlist/mywatchlist");
      setMyWatchlist(res.data.results);
    }
    catch(e){
      alert(e.response.data.msg);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
      checkMyWachlist();
    }
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <>
          {mywatchlist.length > 0 ? (
            <>
              <Outlet />
            </>
          ) : (
            <>
              <h2 style={{ marginLeft: "49px" }}>From Your Watchlist</h2>
              <div className="empty-watchlist">
                <AddBox style={{ fontSize: "40px" }} />
                <p>Your watchlist is empty</p>
                <p>
                  Save shows and movies to keep track of what you want to watch.
                </p>
                <button className="btn-empty-watchlist" onClick={exploreMovies}>
                  Explore more Movies
                </button>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <h2 style={{ marginLeft: "49px" }}>From Your Watchlist</h2>
          <div className="empty-watchlist">
            <AddBox style={{ fontSize: "40px" }} />
            <p>Sign in to access your Watchlist</p>
            <p>
              Save shows and movies to keep track of what you want to watch.
            </p>
            <button
              className="btn-empty-watchlist"
              onClick={() => navigate("/signin")}
            >
              Sign in to IMDb
            </button>
          </div>
        </>
      )}
    </div>
  );
}
