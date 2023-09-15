import { AddBox } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import './protectedlayout.css';

export default function ProtectedLayout() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(()=>{
    if(localStorage.getItem("token")){
        setLoggedIn(true);
    }
  }, [])

  return (
    <div>
      {isLoggedIn ? (
        <>
          <Outlet />
        </>
      ) : (
        <>
          <h2 style={{marginLeft:"49px"}}>From Your Watchlist</h2>
          <div className="unauth">
            <AddBox style={{fontSize:"40px"}}/>
            <p>Sign in to access your Watchlist</p>
            <p>Save shows and movies to keep track of what you want to watch.</p>
            <button className="signin-btn">Sign in to IMDb</button>
          </div>
        </>
      )}
    </div>
  );
}
