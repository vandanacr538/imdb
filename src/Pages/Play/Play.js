import {
  Close,
  ErrorOutline,
  PauseOutlined,
  PlayArrow,
  ReplayOutlined,
} from "@mui/icons-material";
import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import "./play.css";
import "../../utils/interceptor";

export default function Play() {
  const [play, setPlay] = useState(true);
  const [videoEnd, setVideoEnd] = useState(false);
  const [videoKey, setVideoKey] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  const playVideo = () => {
    setPlay(!play);
    setVideoEnd(false);
  };
  const handleVideoStart = () => {
    setPlay(true);
    setVideoEnd(false);
  };
  const handleVideoEnded = () => {
    setPlay(false);
    setVideoEnd(true);
  };
  const getMovieTrailers = async () => {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/" + id + "/videos?language=en-US"
    );
    let movieTrailer = response.data.results.filter((element) => {
      return (
        element.type === "Trailer" &&
        (element.name === "Official Trailer" ||
          element.name === "Official US Trailer")
      );
    });
    if (movieTrailer.length > 0) {
      setVideoKey(movieTrailer[0].key);
    } else {
      setVideoKey("Not available");
    }
  };

  useEffect(() => {
    getMovieTrailers();
  }, []);

  return (
    <div className="play-container">
      <Box sx={{ width: "100%" }}>
        {videoKey ? (
          <>
            <button
              className="play-page-close-icon"
              onClick={() => navigate(-1)}
            >
              <Close />
              <span>Close</span>
            </button>
            <ReactPlayer
              url={"https://youtube.com/watch?v=" + videoKey}
              controls={true}
              height="550px"
              width="100%"
              playing={play}
              onStart={handleVideoStart}
              onReady={() => setPlay(true)}
              onPlay={() => setPlay(true)}
              onPause={() => setPlay(false)}
              onEnded={handleVideoEnded}
            />
            {videoKey === "Not available" ? (
              <div className="video-not-available">
                <ErrorOutline style={{ fontSize: "100px", color: "#bebebe" }} />
                <span>Video Unavailable now</span>
              </div>
            ) : (
              <>
                <div className="play-pause-btn" onClick={playVideo}>
                  {videoEnd ? (
                    <>
                      <ReplayOutlined style={{ fontSize: "80px" }} />
                    </>
                  ) : (
                    <>
                      {play ? (
                        <PauseOutlined style={{ fontSize: "80px" }} />
                      ) : (
                        <PlayArrow style={{ fontSize: "80px" }} />
                      )}
                    </>
                  )}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="play-page-loader">
            <CircularProgress
              style={{ color: "#fff", width: "80px", height: "80px" }}
            />
          </div>
        )}
      </Box>
    </div>
  );
}
