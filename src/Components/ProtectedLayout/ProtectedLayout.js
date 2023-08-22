import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function ProtectedLayout() {
  const [isLoggedIn, setLoggedIn] = useState(true);

  useEffect(()=>{
    if(localStorage.getItem("token")===null){
        setLoggedIn(false);
    }
  })

  return (
    <div>
      {isLoggedIn ? (
        <>
          <Outlet />
        </>
      ) : (
        <>
          <h2 style={{marginLeft:"49px"}}>Sign in to access this</h2>
        </>
      )}
    </div>
  );
}
