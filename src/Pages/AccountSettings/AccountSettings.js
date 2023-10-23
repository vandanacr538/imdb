import React, { useEffect, useState } from 'react'
import "./accountsettings.css";
import { decodeToken } from 'react-jwt';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AccountSettings(props) {
  const [editUserProfile, setEditUserProfile] = useState({});
  const [error, setError]=useState({
    nameError:"", current_passwordError:"", new_passwordError:"", re_enter_new_passwordError:""});
  const navigate=useNavigate();

  const handleChangeEditUserProfile=(e)=>{
    setEditUserProfile((previousData)=>({...previousData, [e.target.name]:e.target.value}));
  }
  const handleClickCancelEdit=()=>{
    navigate("/");
  }
  const validateUserData=()=>{
    if(editUserProfile.name === ""){
      setError((previousData)=>({...previousData, nameError:"Name cannot be emmpty"}));
      return false;
    }
    if("current_password" in editUserProfile || "new_password" in editUserProfile || "re_enter_new_password" in editUserProfile){
      if(editUserProfile.current_password===editUserProfile.password){
        if((editUserProfile.new_password ==="" && editUserProfile.re_enter_new_password==="") || (!("new_password" in editUserProfile) && !("re_enter_new_password" in editUserProfile))){
          setError((previousData)=>({...previousData, current_passwordError:"", new_passwordError:"Enter your new Password"}));
          return false;
        }
        else if (editUserProfile.new_password !=="" || editUserProfile.re_enter_new_password!=="") {
          if(editUserProfile.current_password!==editUserProfile.new_password){
            if(editUserProfile.new_password===editUserProfile.re_enter_new_password){
              if(editUserProfile.new_password.length>=8){
                setError((previousData)=>({...previousData, current_passwordError:"", new_passwordError:"", re_enter_new_passwordError:""}));
                return true;
              }
              else{
                setError((previousData)=>({...previousData, current_passwordError:"", new_passwordError:"Password must have atleast 8 characters", re_enter_new_passwordError:""}));
                return false;
              }
            }
            else{
              setError((previousData)=>({...previousData, current_passwordError:"", new_passwordError:"Passwords must match", re_enter_new_passwordError:"Passwords must match" }));
              return false;
            }
          }
          else{
            setError((previousData)=>({...previousData, current_passwordError:"", new_passwordError:"New password cannot be same as current password", re_enter_new_passwordError:""}));
            return false;
          }
        }
      }
      else if(editUserProfile.current_password==="" || !("current_password" in editUserProfile)){
        setError((previousData)=>({...previousData, current_passwordError:"Current Password is required", new_passwordError:"", re_enter_new_passwordError:""}));
        return false;
      }
      else{
        setError((previousData)=>({...previousData, current_passwordError:"Current Password is not correct", new_passwordError:"", re_enter_new_passwordError:""}));
        return false;
      }
    }
    else if (!("current_password" in editUserProfile) && !("new_password" in editUserProfile) && !("re_enter_new_password" in editUserProfile)) {
      setError((previousData)=>({...previousData, current_passwordError:"", new_passwordError:"", re_enter_new_passwordError:""}));
      return true;
    }
    else{
      setError((previousData)=>({...previousData, nameError:"", current_passwordError:"", new_passwordError:"", re_enter_new_passwordError:""}));
      return true;
    }
  }
  const getUserData=async()=>{
    if(localStorage.getItem("token")){
      try{
        let userDataDecoded=decodeToken(localStorage.getItem("token"));
        const result = await axios.post("http://localhost:8080/createaccount/getuserprofiledata", userDataDecoded);
        setEditUserProfile(decodeToken(result.data.token));
      }
      catch(e){
        console.log(e);
      }
    }
  }
  const updateUserProfile= async()=>{
    try{
      const result=await axios.post("http://localhost:8080/createaccount/edituserdata", editUserProfile); 
      if(result.status===200){
        localStorage.setItem("token", result.data.token);
        getUserData();
        navigate("/");
        window.location.reload();
      } 
    } 
    catch(e){
      console.log(e.response.data.msg);
    }
  }
  const handleClickSaveData=()=>{
    if(validateUserData()){
      updateUserProfile();
    }
  }
  useEffect(()=>{
    if(localStorage.getItem("token")){
      getUserData();
    }
  }, []);
  return (
    <div className='acc-settings-page'>
      <div className='acc-settings-box'>
        <h2>Account Settings</h2>
        <div className='acc-settings-container'>
          <div className='acc-settings-user-profile'>
            <h3>User Details</h3>
            <div className='page-fields'>
              <label for="name">Name</label>
              <input type='text' id='name' className='page-input' name="name" value={editUserProfile.name} onChange={handleChangeEditUserProfile}></input>
              <p className={error.nameError!=="" ? "settings-error" : "no-settings-error"}>{error.nameError}</p>
            </div>
            <div className='page-fields'>
              <label for="email">Email</label>
              <input type='text' id='email' className='page-input' name="email" value={editUserProfile.email} onChange={handleChangeEditUserProfile} disabled></input>
            </div>
            <p className='acc-settings-note'><b>Note:</b> You cannot edit email-address, create a new account to change email address</p>
          </div>
          <div className='change-password'>
            <h3>Change Password</h3>
            <div className='page-fields'>
              <label for="current-password">Current Password</label>
              <input type='text' id='current-password' className='page-input' name="current_password" onChange={handleChangeEditUserProfile} ></input>
              <p className={error.current_passwordError!=="" ? "settings-error" : "no-settings-error"}>{error.current_passwordError}</p>
            </div>
            <div className='page-fields'>
              <label for="new_password">New Password</label>
              <input type='password' id='new_password' className='page-input' name="new_password" onChange={handleChangeEditUserProfile} ></input>
              <p className={error.new_passwordError!=="" ? "settings-error" : "no-settings-error"}>{error.new_passwordError}</p>
            </div>
            <div className='page-fields'>
              <label for="re_enter_new_password">Re-enter New Password</label>
              <input type='password' id='re_enter_new_password' className='page-input' name="re_enter_new_password" onChange={handleChangeEditUserProfile} ></input>
              <p className={error.re_enter_new_passwordError!=="" ? "settings-error" : "no-settings-error"}>{error.re_enter_new_passwordError}</p>
            </div>
            <div className='acc-settings-btns'>
              <button className='cancel-btn' onClick={handleClickCancelEdit}>Cancel</button>
              <button className='save-btn' onClick={handleClickSaveData}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
