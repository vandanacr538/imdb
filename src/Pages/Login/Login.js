import React, { useState } from 'react'
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        <img src="https://miro.medium.com/v2/resize:fit:1400/1*u0bwdudgoyKjSLntsRcqiw.png" className='g-signin-img'></img>
    </div>
  )
}
