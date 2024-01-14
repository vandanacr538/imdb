import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainComp from './Components/MainComp/MainComp';
import Play from './Pages/Play/Play';
import Signin from './Pages/Signin/Signin';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect, useState } from 'react';
import { KeyboardArrowUp } from '@mui/icons-material';
import SigninWithIMDb from './Pages/SigninWithIMDb/SigninWithIMDb';
import HeaderFooterLayout from './Components/HeaderFooterLayout/HeaderFooterLayout';
import CreateAccount from './Pages/CreateAccount/CreateAccount';
import OTPVerification from './Pages/OTPVerification/OTPVerification';
import AccountSettings from './Pages/AccountSettings/AccountSettings';
import Watchlist from './Pages/Wactchlist/Watchlist';
import BrowseTrailers from './Pages/BrowseTrailers/BrowseTrailers';
import AuthContextProvider from './Context/AuthContext';

function App() {
  const [displayBTTBtn, setDisplayBTTBtn]=useState("");
  const scrollToTop=()=>{
    window.scroll({top:0, behavior:"smooth"});
  }

  useEffect(()=>{
    window.addEventListener("scroll", () => {
      if (window.scrollY > 1400) {
        setDisplayBTTBtn("flex");
      } 
      else {
        setDisplayBTTBtn("");
      }
    });
  }, []);
  
  return (
    <GoogleOAuthProvider clientId='870411297270-6o0fhfph6pi86ic5vk4la9nk8h5h2jnn.apps.googleusercontent.com'>
      <AuthContextProvider>
        <div>
          <button className='back-to-top-btn' onClick={scrollToTop} style={{display:displayBTTBtn}}>
            <KeyboardArrowUp/>
            Back to top
          </button>
          <BrowserRouter>
          <Routes>
            <Route path='/' element={<HeaderFooterLayout/>}>
                <Route path='/' element={<MainComp/>}></Route>
                <Route path='/play/:id' element={<Play/>}></Route>
                <Route path='/signin' element={<Signin />}></Route>
                <Route path='/account_settings' element={<AccountSettings/>}></Route>
                <Route path='/watchlist' element={<Watchlist/>}></Route>
                <Route path='/browsetrailers' element={<BrowseTrailers/>}></Route>
            </Route>
          </Routes>
          <Routes>
            <Route path='/signin/signin_with_imdb' element={<SigninWithIMDb/>}></Route>
            <Route path='/create_account' element={<CreateAccount/>}></Route>
            <Route path='/create_account/otp_verification' element={<OTPVerification/>}></Route>
          </Routes>
          </BrowserRouter>
        </div>
      </AuthContextProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
