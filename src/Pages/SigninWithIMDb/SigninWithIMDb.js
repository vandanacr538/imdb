import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../CommonStyle/signinandcreateacc.css';
import './signinwithimdb.css';
import base64 from "base-64";
import { AuthContext } from '../../Context/AuthContext';

export default function SigninWithIMDb() {
  const [loginData, setLoginData]=useState({});
  const [loginError, setLoginError]=useState("");
  const [emptyError, setEmptyError]=useState({emailError:"", passwordError:""});
  const navigate=useNavigate();
  const {setAuthButton} = useContext(AuthContext);

  const gotoHome=()=>{
    navigate("/");
  }
  const gotoCreateAccPage=()=>{
    navigate("/create_account");
  }
  const handleChangeLoginData=(e)=>{
    setLoginData((previousData)=>({...previousData, [e.target.name]:e.target.value}));
  }
  const validataLogin=async()=>{
    setLoginError("");
    setEmptyError((previousValue)=>({...previousValue, 
      emailError:"",
      passwordError:""
    }));
    if(Object.keys(loginData).length<=1 || loginData.email==="" || loginData.password===""){
      if(Object.keys(loginData).length===0){
        setEmptyError((previousValue)=>({...previousValue, 
          emailError:"",
          passwordError:""
        }));
      }
      if(loginData.email==="" || !("email" in loginData)){
        setEmptyError((previousValue)=>({...previousValue, emailError:"Enter your email"}));
      }
      else{
        setEmptyError((previousValue)=>({...previousValue, emailError:""}));
      }
      if(loginData.password==="" || !("password" in loginData)){
        setEmptyError((previousValue)=>({...previousValue, passwordError:"Enter your password"}));
      }
      else{
        setEmptyError((previousValue)=>({...previousValue, passwordError:""}));
      }
    } 
    else{
      const encodeLoginData=base64.encode(JSON.stringify(loginData));
      try{
        let result=await axios.post("https://imdb-backend-gc2o.onrender.com/login/loginapi", 
        {},
        {
          headers:{
            Authorization:encodeLoginData
          }
        });
        if(result.status===200){
          localStorage.setItem("token", result.data.token);
          setAuthButton(true);
          navigate("/");
        }
      }
      catch(e){
        if(e.response.status===403){
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
  return (
    <div className='page-main-box'>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
        alt="imdblogo"
        className="imdb-logo"
        onClick={gotoHome}
      />
      <div className='page-container signin-container'> 
        <h1>Sign in</h1>
        <div className='page-fields'>
          <label htmlFor="email">Email</label>
          <input type='text' id='email' className='page-input' name="email" onChange={handleChangeLoginData}></input>
          <p className={emptyError.emailError!=="" ? "empty-login-error" : "no-login-error"}>
            {emptyError.emailError}
          </p>
        </div>
        <div className='page-fields'>
          <label htmlFor="password">Password</label>
          <input type='password' id='password' className='page-input' name="password" onChange={handleChangeLoginData}></input>
          <p className={emptyError.passwordError!=="" ? "empty-login-error" : "no-login-error"}>
            {emptyError.passwordError}
          </p>
          <p className={loginError!=="" ? "login-error" : "no-login-error" }>
            {loginError}
          </p>
        </div>
        <div className='page-task-complete-btn-container'>
          <button className='page-task-complete-btn' onClick={validataLogin}>Sign in</button>
        </div>
        <p id='text-with-line'><span>New to IMDb?</span></p>
        <div className='page-fields'>
          <button className='create-new-acc-icon-signinpage' onClick={gotoCreateAccPage}>Create your IMDb account</button>
        </div>
      </div>
    </div>
  )
}
