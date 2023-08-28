import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";

export default function Play() {
  const [play, setPlay] = useState(false);
  const [videoKey, setVideoKey] = useState();
  const {id}=useParams();

  const playVideo=()=>{
    setPlay(!play);
  }
  const getMovieTrailers=async()=>{
    const response=await axios.get("https://api.themoviedb.org/3/movie/" +id+ "/videos?language=en-US",
    {
      headers:{
        Authorization:
        "Bearer "+
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNjhhYWU0YzYyNzFlNmNmZjUzODNlMGU5YjM3ZTRlYyIsInN1YiI6IjY0Y2U2YWY1NmQ0Yzk3MDBjYjdkYjg0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0exlYdltt0_hYnHKl7FexczP3qg_sChBIeCZypZXsT0"
      },
    });
    let movieTrailer=response.data.results.filter((element)=>{
      return element.type==="Trailer" && element.name==="Official Trailer";
    });
    setVideoKey(movieTrailer[0].key);
  }

  useEffect(()=>{
    getMovieTrailers();
  }, []);

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <ReactPlayer
          url={"https://youtube.com/watch?v=" +videoKey}
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
