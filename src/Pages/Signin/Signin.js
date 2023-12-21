import React from 'react'
import './signin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import History from '../../Components/History/History';
import google from "../../Assets/google.png";
import { useGoogleLogin } from '@react-oauth/google'; 

export default function Signin(props) {
  const navigate=useNavigate();

  const gotoLoginInWithIMDb=()=>{
    navigate("/signin/signin_with_imdb")
  }
  const loginWithGoogle = useGoogleLogin({   
    onSuccess: (credentialResponse) => {
      sendToken(credentialResponse.access_token);
    },
    onError: (error) => console.log('Login Failed:', error)
  });
  const sendToken=async(token)=>{
    const result=await axios.post("https://imdb-backend-gc2o.onrender.com/login/oauth", 
    {},
    {
      headers:{
        Authorization:token
      }
    });
    if(result.status===200 && (result.data.msg==="Already verified user" || result.data.msg==="oauth successfull")){
      localStorage.setItem("token", result.data.token);
      props.setAuthButton(true);
      navigate("/");
      window.location.reload();
    }
  }
  const gotoCreateAccPage=()=>{
    navigate("/create_account");
  }

  return (
    <div className='all-signin-list-page'>
      <div className='all-signin-list-box'>
        <div className='all-signin-container'>
          <div className='all-signin-list'>
            <h2>Sign in</h2>
            <div className='sign-in-with-btn' onClick={gotoLoginInWithIMDb}>
                <img className='sign-in-with-logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png' alt='imdb-logo'></img>
                <span className='sign-in-with-text'>Sign in with IMDb</span>
            </div>
            <div className='sign-in-with-btn' onClick={loginWithGoogle}>
                <img className='sign-in-with-logo' src={google} alt='imdb-logo'></img>
                <span className='sign-in-with-text'>Sign in with Google</span>
            </div>
            <p id='or-line'><span>or</span></p>
            <div className='signup-btn-in-signin' onClick={gotoCreateAccPage}>
              <span className='signup-btn-text'>Create a New Account</span>
            </div>
          </div>
          <div className='signin-page-details-side'>
            <h2>Benefits of your free IMDb account</h2>
            <div className='signin-page-detail'>
              <strong>Personalized Recommendations</strong>
              <p>Discover shows you'll love.</p>
            </div>
            <div className='signin-page-detail'>
              <strong>What you find on IMDb</strong>
              <p>You can watch any new latest movie trailers on IMDb.</p>
            </div>
            <div className='signin-page-detail'>
              <strong>Your Watchlist</strong>
              <p>Track everything you want to watch and save it in your watchlist.</p>
            </div>
            <div className='signin-page-detail'>
              <strong>Search in IMDb</strong>
              <p>You can search any new latest movie in search bar and you acn watch trailor.</p>
            </div>
          </div>
        </div>
        <div>
          <History/>
        </div>
      </div>
    </div>
  )
}
