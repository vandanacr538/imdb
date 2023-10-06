import React, { useState } from 'react'
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin} from '@react-oauth/google';
import History from '../../Components/History/History';
import google from "../../Assets/google.png";

export default function Login() {
  const navigate=useNavigate();

  const gotoLoginInWithIMDb=()=>{
    navigate("/loginwithIMDb")
  }
  const sendToken=async(token)=>{
    const response=await axios.post("http://localhost:8080/login/oauth", {token:token.credential});
    if(response.status===200 && response.data.msg==="Already verified user" || response.data.msg==="oauth successfull"){
      localStorage.setItem("token", response.data.token);
      navigate("/");
    }
  }

  return (
    <div className='all-signin-list-box'>
        <div className='all-signin-container'>
          <div className='all-signin-list'>
            <h2>Sign in</h2>
            <div className='sign-in-with-btn' onClick={gotoLoginInWithIMDb}>
                <img className='sign-in-with-logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png' alt='imdb-logo'></img>
                <span className='sign-in-with-text'>Sign in with IMDb</span>
            </div>
            <div className='sign-in-with-btn'>
                <img className='sign-in-with-logo' src={google} alt='imdb-logo'></img>
                <span className='sign-in-with-text'>Sign in with IMDb</span>
            </div>
            <div className='g-signin'>
            <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    sendToken(credentialResponse);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
            </div>
          </div>
          <div className='signin-page-details-side'>
            <h2>Benefits of your free IMDb account</h2>
            <div className='signin-page-detail'>
              <strong>Personalized Recommendations</strong>
              <p>Discover shows you'll love.</p>
            </div>
            <div className='signin-page-detail'>
              <strong>Your Watchlist</strong>
              <p>Track everything you want to watch and receive e-mail when movies open in theaters.</p>
            </div>
            <div className='signin-page-detail'>
              <strong>Your Ratings</strong>
              <p>Rate and remember everything you've seen.</p>
            </div>
            <div className='signin-page-detail'>
              <strong>Contribute to IMDb</strong>
              <p>Add data that will be seen by millions of people and get cool badges.</p>
            </div>
          </div>
        </div>
        <div>
          <History/>
        </div>
    </div>
  )
}
