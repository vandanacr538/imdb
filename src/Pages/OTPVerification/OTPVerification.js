import React, { useState } from 'react'
import "./../loginandcreateacc.css";
import "./otpverification.css"
import { useLocation, useNavigate } from 'react-router-dom';
import { Error } from '@mui/icons-material';
import axios from 'axios';

export default function OTPVerification(props) {
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] =useState("");
  const navigate=useNavigate();
  const location = useLocation();
  const {email} = location.state.createAccData;

  const gotoHome=()=>{
    navigate("/");
  }
  const handleChangeOTP=(e)=>{
    setOtp(e.target.value);
  }
  const validateOTP=async()=>{
    if(otp===""){
        setOtpError("Enter OTP sent on your "+email);
    }
    else{
        setOtpError("");
        try{
            let result=await axios.post("http://localhost:8080/createaccount/verifyotp", {otp, email});
            if(result.status===200){
                console.log(result.data.token);
                localStorage.setItem("token", result.data.token);
                props.setAuthButton(true);
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
        <p id="otp-verif-desc">To verify your email, we've sent a One Time Password (OTP) to email-address <span>(Change)</span></p>
        <div className='page-fields'>
          <label for="otp">Enter OTP</label>
          <input type='text' id='otp' className='page-input' name="otp" maxLength={6} onChange={handleChangeOTP}></input>
          <p className={otpError!="" ? "otp-error" : "no-otp-error"}>
            <Error style={{color:"#c40000", marginRight:"5px"}}/>
            {otpError}
          </p>
        </div>
        <div className='page-task-complete-btn-container'>
            <button className='page-task-complete-btn' onClick={validateOTP}>Create your IMDb account</button>
        </div>
        <p id="otp-verif-condition">By creating an IMDb account, you agree to the IMDb <span>Conditions of Use</span></p>
        <span class='resend-otp'>Resend OTP</span>
      </div>
    </div>
  )
}