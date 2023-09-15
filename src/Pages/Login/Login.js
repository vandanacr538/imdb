import React, { useEffect, useState } from 'react'
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import Cookies from 'js-cookie';

export default function Login() {
  const [loginData, setLoginData]=useState({});
  const navigate=useNavigate();

  const handleChangeLoginData=(e)=>{
    setLoginData((previousData)=>{
      setLoginData({...previousData, [e.target.name]:e.target.value})
    });
  }
  const validataLogin=async()=>{
    const response=await axios.post("http://localhost:8080/login/loginapi", loginData);
    localStorage.setItem("token", response.data.token);
    navigate("/");
  }
  const sendToken=async(token)=>{
    const response=await axios.post("http://localhost:8080/login/oauth", {token:token.credential});
    if(response.status===200 && response.data.msg==="Already verified user" || response.data.msg==="oauth successfull"){
      localStorage.setItem("token", response.data.token);
      navigate("/");
    }
  }
  useEffect(()=>{
    console.log(JSON.parse(Cookies.get("history")));
  }, [])

  return (
    <div className='signin-container'>
        <h1>Sign in</h1>
        <div className='signin-fields'>
            <label for="email">Email</label>
            <input type='text' id='email' className='signin-input' name="username" onChange={handleChangeLoginData}></input>
        </div>
        <div className='signin-fields'>
            <label for="password">Password</label>
            <input type='text' id='password' className='signin-input' name="password" onChange={handleChangeLoginData}></input>
        </div>
        <div className='signin-fields'>
            <button className='signin' onClick={validataLogin}>Sign in</button>
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
  )
}
