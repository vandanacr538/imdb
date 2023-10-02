import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import "./history.css";

export default function History() {
  const [cookieMovies, setCookieMovies] = useState([]);
  useEffect(() => {
    if (Cookies.get("history")) {
      setCookieMovies(JSON.parse(Cookies.get("history")));
    }
  }, []);
  return (
    <div>
      <div className="history-container">
        <div className="history-header">
          <h2 className="history-heading">Recently Viewed</h2>
          <a href="#" className="clear-history">
            Clear your history
          </a>
        </div>
        {cookieMovies?.map((element) => {
          return (
            <>
              <img
                src={`https://image.tmdb.org/t/p/w185/` + element.poster_path}
                className="history-img"
              ></img>
            </>
          );
        })}
      </div>
    </div>
  );
}
