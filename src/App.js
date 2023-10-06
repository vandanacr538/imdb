import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainComp from './Components/MainComp/MainComp';
import Play from './Pages/Play/Play';
import Header from './Components/Header/Header';
import Ad from './Components/Advertisement/Ad';
import Footer from './Components/Footer/Footer';
import Login from './Pages/Login/Login';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect, useState } from 'react';
import { KeyboardArrowUp } from '@mui/icons-material';
import LoginWithIMDb from './Pages/Login/LoginWithIMDb/LoginWithIMDb';
import HeaderFooterLayout from './Components/HeaderFooterLayout/HeaderFooterLayout';

function App() {
  const [authButton, setAuthButton]=useState("Sign In");
  const [displayBTTBtn, setDisplayBTTBtn]=useState("");
  const scrollToTop=()=>{
    window.scroll({top:0, behavior:"smooth"});
  }
  useEffect(()=>{
    if(localStorage.getItem("token")){
      setAuthButton("Sign Out");
    }
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
    <GoogleOAuthProvider clientId='484151294674-jno436mqufdpsenrg2csnllfdpu8f1g8.apps.googleusercontent.com'>
      <div>
      <button className='back-to-top-btn' onClick={scrollToTop} style={{display:displayBTTBtn}}>
        <KeyboardArrowUp/>
        Back to top
      </button>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HeaderFooterLayout authButton={authButton}/>}>
            <Route path='/' element={<MainComp/>}></Route>
            <Route path='/play/:id' element={<Play/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
        </Route>
      </Routes>
      <Routes>
        <Route path='/loginwithIMDb' element={<LoginWithIMDb setAuthButton={setAuthButton} />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
    </GoogleOAuthProvider>
  );
}

export default App;
