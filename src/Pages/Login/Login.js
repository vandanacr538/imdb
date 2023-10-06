import React, { useState } from 'react'
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import History from '../../Components/History/History';

export default function Login(props) {
  const [loginData, setLoginData]=useState({});
  const [loginError, setLoginError]=useState("");
  const [emptyError, setEmptyError]=useState({usernameError:"", passwordError:""});
  const navigate=useNavigate();

  const handleChangeLoginData=(e)=>{
    setLoginData((previousData)=>({...previousData, [e.target.name]:e.target.value}));
  }
  const validataLogin=async()=>{
    setLoginError("");
    setEmptyError((previousValue)=>({...previousValue, 
      usernameError:"",
      passwordError:""
    }));
    if(Object.keys(loginData).length<=1 || loginData.username==="" || loginData.password===""){
      if(Object.keys(loginData).length===0){
        setEmptyError((previousValue)=>({...previousValue, 
          usernameError:"",
          passwordError:""
        }));
      }
      if(loginData.username==="" || !("username" in loginData)){
        setEmptyError((previousValue)=>({...previousValue, usernameError:"Enter your username or email"}));
      }
      else{
        setEmptyError((previousValue)=>({...previousValue, usernameError:""}));
      }
      if(loginData.password==="" || !("password" in loginData)){
        setEmptyError((previousValue)=>({...previousValue, passwordError:"Enter your password"}));
      }
      else{
        setEmptyError((previousValue)=>({...previousValue, passwordError:""}));
      }
    } 
    else{
      try{
        let result=await axios.post("http://localhost:8080/login/loginapi", loginData);
        if(result.status===200){
          localStorage.setItem("token", result.data.token);
          props.setAuthButton("Sign Out");
          navigate("/");
        }
      }
      catch(e){
        if(e.response.status===403){
          console.log("403");
          setLoginError(e.response.data.msg);
        }
        else if(e.response.status===401){
          setLoginError(e.response.data.msg);
        }
        else{
          setLoginError(e.response.data.msg);
        }
      }
    }
  }
  const sendToken=async(token)=>{
    const response=await axios.post("http://localhost:8080/login/oauth", {token:token.credential});
    if(response.status===200 && response.data.msg==="Already verified user" || response.data.msg==="oauth successfull"){
      localStorage.setItem("token", response.data.token);
      navigate("/");
    }
  }

  return (
    <div className='signin-main-box'>
        <div className='signin-container'>
          <h1>Sign in</h1>
          <div className='signin-fields'>
              <label for="email">Email</label>
              <input type='text' id='email' className='signin-input' name="username" onChange={handleChangeLoginData}></input>
              <p className={emptyError.usernameError!="" ? "empty-login-error" : "no-login-error"}>
                {emptyError.usernameError}
              </p>
          </div>
          <div className='signin-fields'>
              <label for="password">Password</label>
              <input type='text' id='password' className='signin-input' name="password" onChange={handleChangeLoginData}></input>
              <p className={emptyError.passwordError!="" ? "empty-login-error" : "no-login-error"}>
                {emptyError.passwordError}
              </p>
              <p className={loginError!="" ? "login-error" : "no-login-error" }>
                {loginError}
              </p>
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
        <div>
          <History/>
        </div>
    </div>
  )
}
