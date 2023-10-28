import axios from "axios";
import { encodeEditUserProfile } from "../Pages/AccountSettings/AccountSettings";

axios.interceptors.request.use((config) => {
//   console.log(config);
  if (config.url.includes("themoviedb")) {
    config.headers["Authorization"] = "Bearer " +
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNjhhYWU0YzYyNzFlNmNmZjUzODNlMGU5YjM3ZTRlYyIsInN1YiI6IjY0Y2U2YWY1NmQ0Yzk3MDBjYjdkYjg0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0exlYdltt0_hYnHKl7FexczP3qg_sChBIeCZypZXsT0";
  }
  else{
    if (localStorage.getItem("token") != null) {
      if(config.url.includes("edituserdata")){
        config.headers["Authorization"] = encodeEditUserProfile;
      }
      else{
        config.headers["Authorization"] = localStorage.getItem("token");
      }
        
    }
  }
  return config;
});
