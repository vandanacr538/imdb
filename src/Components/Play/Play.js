import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";

export default function Play() {
  const [play, setPlay] = useState(false);
  const {id}=useParams();

  const playVideo=()=>{
    setPlay(!play);
  }

  useEffect(()=>{
    console.log("api call with "+id);
  }, []);

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <ReactPlayer
          url="http://localhost:3000/movie.mp4"
          controls={true}
          height="550px"
          width="70%"
          playing={play}
          onStart={()=>{
            setPlay(true);
            console.log("onstart after: "+play);
          }}
          onPause={()=>{
            console.log("onpause before: "+play);
            setPlay(false);
            console.log("onspause after: "+play);
          }}
        />
        <button onClick={playVideo}>{play ? "Pause" : "Play"}</button>
      </Box>
    </div>
  );
}
