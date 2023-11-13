import React, { useEffect, useState } from "react";
import "../../CommonStyle/signinandcreateacc.css";
import "./createaccount.css"
import { useNavigate } from "react-router-dom";
import { ArrowRight, WarningAmber } from "@mui/icons-material";
import axios from "axios";
import base64 from "base-64";

export default function CreateAccount() {
    const [createAccData, setCreateAccData]=useState({ name:"", email:"", password:"", re_enter_password:""});
    const [errorsArray, setErrorsArray]=useState([]);
    const [isAllDataValid, setIsAllDataValid]=useState(false);
    const navigate=useNavigate();

    const gotoHome=()=>{
        navigate("/");
    }
    const handleChangeCreateAccData=(e)=>{
        setCreateAccData((previousData)=>({...previousData, [e.target.name]:e.target.value}))
    }
    const validateName=()=>{
      if(createAccData.name === ""){
        setErrorsArray((previousData)=>([...previousData, "Enter your name"]));
        setIsAllDataValid(false);
      }
      else{
        setIsAllDataValid(true);
      }
    }
    const validateEmail=()=>{
      if (createAccData.email === "") {
        setErrorsArray((previousData)=>([...previousData, "Enter your email"]));
        setIsAllDataValid(false);
      }
      else{
        setIsAllDataValid(true);
      }
    }
    const validatePassword=()=>{
      if (createAccData.password === "" && createAccData.re_enter_password === "") {
        setErrorsArray((previousData)=>([...previousData, "Enter your password"]));
        setIsAllDataValid(false);
      }
      else if(createAccData.password!==createAccData.re_enter_password){
        setErrorsArray((previousData)=>([...previousData, "Passwords must match"]));
        setIsAllDataValid(false);
      }
      else if(createAccData.password!==""){
        if(createAccData.password.length<8){
          setErrorsArray((previousData)=>([...previousData, "Passwords must be at least 8 characters"]));
          setIsAllDataValid(false);
        }
      }
      else{
        setIsAllDataValid(true);
      }
    }
    const validateCreateAccount= ()=>{
        console.log(createAccData);
        setErrorsArray([]);
        validateName();
        validateEmail();
        validatePassword();
        document.querySelector(".page-error-box").style.display="flex";
        // console.log(errorsArray);
    }
    const signUp=async()=>{
      // console.log("call api");
      const encodeCreateAccData=base64.encode(JSON.stringify(createAccData));
      try{
        let result=await axios.post("http://localhost:8080/createaccount/createaccountapi", 
        {}, {
          headers:{
            Authorization: encodeCreateAccData
          }
        }
        );
        if(result.status===200){
          if(result.data.token==="already exists"){
            console.log(result.data.token);
            document.querySelector(".page-error-box").style.display="flex";
            setErrorsArray((previousData)=>([...previousData, result.data.msg]));
            setIsAllDataValid(false);
          }
          else{
            const createAccAPIResponseToken=result.data.token
            navigate("/create_account/otp_verification", {state:{createAccAPIResponseToken}});
          }
        }
      }
      catch(e){
        console.log(e.response.data.msg);
      }
    }
    useEffect(()=>{
      if(isAllDataValid){
        document.querySelector(".page-error-box").style.display="";
        signUp();
      }
    }, [isAllDataValid])
    return (
    <div className="page-main-box">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
        alt="imdblogo"
        className="imdb-logo"
        onClick={gotoHome}
      />
      <div className="page-error-box">
        <WarningAmber style={{color:"#c40000", fontSize:"27px"}}/>
        <div>
          <p id="page-error-box-heading">There was a problem</p>
          <ul className="create-acc-error-list">
            {errorsArray?.map((elem)=>{
              return(
                <>
                <li>{elem}</li>
                </>
              )
            })}
          </ul>
        </div>
      </div>
      <div className="page-container create-acc-container">
        <h1>Create account</h1>
        <div className='page-fields'>
          <label htmlFor="name">Your name</label>
          <input type='text' id='name' className='page-input' name="name" placeholder="First and last name" onChange={handleChangeCreateAccData}></input>
        </div>
        <div className='page-fields'>
          <label htmlFor="email">Email</label>
          <input type='email' id='email' className='page-input' name="email" onChange={handleChangeCreateAccData}></input>
        </div>
        <div className='page-fields'>
          <label htmlFor="password">Password</label>
          <input type='password' id='password' className='page-input' name="password" placeholder="at least 8 characters" onChange={handleChangeCreateAccData}></input>
          <p className="password-rule">Passwords must be at least 8 characters.</p>
        </div>
        <div className='page-fields'>
          <label htmlFor="re-enter-password">Re-enter passsword</label>
          <input type='password' id='re-enter-password' className='page-input' name="re_enter_password" onChange={handleChangeCreateAccData}></input>
        </div>
        <div className='page-task-complete-btn-container create-btn-with-shadow'>
            <button className='page-task-complete-btn' onClick={validateCreateAccount}>Create your IMDb account</button>
        </div>
        <div id="signin-link-div-in-createacc">
            Already have an account?
            <div id="signin-link" onClick={()=>navigate("/signin/signin_with_imdb")}>Sign in<ArrowRight style={{fontSize:"15px"}}/></div>
        </div>
      </div>
    </div>
  );
}
