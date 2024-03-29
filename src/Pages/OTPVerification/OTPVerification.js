import React, { useContext, useState } from 'react'
import "../../CommonStyle/signinandcreateacc.css";
import "./otpverification.css"
import { useLocation, useNavigate } from 'react-router-dom';
import { Error } from '@mui/icons-material';
import axios from 'axios';
import base64 from "base-64";
import { decodeToken } from 'react-jwt';
import { AuthContext } from '../../Context/AuthContext';

export default function OTPVerification() {
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] =useState("");
  const [otpSent, setOtpSent] = useState("");
  const navigate=useNavigate();
  const location = useLocation();
  const  {email}= decodeToken(location.state.createAccAPIResponseToken);
  const {setAuthButton} = useContext(AuthContext);

  const gotoHome=()=>{
    navigate("/");
  }
  const handleChangeOTP=(e)=>{
    setOtp(e.target.value);
  }
  const resendOTP=async()=>{
    try{
      let result=await axios.post("https://imdb-backend-gc2o.onrender.com/createaccount/resendotp", {}, 
      {
        headers:{
          Authorization: base64.encode(email)
        }
      });
      if(result.status===200){
        setOtpSent(result.data.msg);
        setTimeout(()=>{
          setOtpSent("");
        }, 20000);
      }
    }
    catch(e){
      alert(e.response.data.msg);
    }
  }
  const validateOTP=async()=>{
    if(otp===""){
        setOtpError("Enter OTP sent on your "+email);
    }
    else{
        setOtpError("");
        const otpObj={otp:otp, email:email};
        try{
            let result=await axios.post("https://imdb-backend-gc2o.onrender.com/createaccount/verifyotp", {},
            {
              headers:{
                Authorization:base64.encode(JSON.stringify(otpObj))
              }
            });
            if(result.status===200){
                localStorage.setItem("token", result.data.token);
                setAuthButton(true);
                navigate("/");
            }
        }
        catch(e){
            if(e.response.status===410){
                setOtpError(e.response.data.msg);
            }
            else if(e.response.status===401){
                setOtpError(e.response.data.msg);
            }
            else{
                setOtpError(e.response.data.msg);
            }
        }  
    }
  }

  return (
    <div className='page-main-box'>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
        alt="imdblogo"
        className="imdb-logo"
        onClick={gotoHome}
      />
      <div className='page-container otp-verif-container'> 
        <h1>Verify email Address</h1>
        <p id="otp-verif-desc">To verify your email, we've sent a One Time Password (OTP) to email-address <span onClick={()=>navigate("/create_account")}>(Change)</span></p>
        <div className='page-fields'>
          <label for="otp">Enter OTP</label>
          <input type='text' id='otp' className='page-input' name="otp" maxLength={6} onChange={handleChangeOTP}></input>
          <p className={otpError!=="" ? "otp-error" : "no-otp-error"}>
            <Error style={{color:"#c40000", marginRight:"5px"}}/>
            {otpError}
          </p>
          <p className={otpSent!=="" ? "otp-sent" : "no-otp-error"}>
            {otpSent}
          </p>
        </div>
        <div className='page-task-complete-btn-container'>
            <button className='page-task-complete-btn' onClick={validateOTP}>Create your IMDb account</button>
        </div>
        <p id="otp-verif-condition">By creating an IMDb account, you agree to the IMDb <span>Conditions of Use</span></p>
        <span class='resend-otp' onClick={resendOTP}>Resend OTP</span>
      </div>
    </div>
  )
}
