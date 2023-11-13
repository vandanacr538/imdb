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

function App() {
  const [authButton, setAuthButton]=useState(false);
  const [displayBTTBtn, setDisplayBTTBtn]=useState("");
  const [watchlistMoviesCount, setWatchlistMoviesCount] = useState([]);
  const scrollToTop=()=>{
    window.scroll({top:0, behavior:"smooth"});
  }
  useEffect(()=>{
    if(localStorage.getItem("token")){
      setAuthButton(true);
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
    <GoogleOAuthProvider clientId='870411297270-6o0fhfph6pi86ic5vk4la9nk8h5h2jnn.apps.googleusercontent.com'>
      <div>
      <button className='back-to-top-btn' onClick={scrollToTop} style={{display:displayBTTBtn}}>
        <KeyboardArrowUp/>
        Back to top
      </button>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HeaderFooterLayout authButton={authButton} watchlistMoviesCount={watchlistMoviesCount} setWatchlistMoviesCount={setWatchlistMoviesCount}/>}>
            <Route path='/' element={<MainComp/>}></Route>
            <Route path='/play/:id' element={<Play/>}></Route>
            <Route path='/signin' element={<Signin setAuthButton={setAuthButton}/>}></Route>
            <Route path='/account_settings' element={<AccountSettings/>}></Route>
            <Route path='/watchlist' element={<Watchlist setWatchlistMoviesCount={setWatchlistMoviesCount}/>}></Route>
            <Route path='/browsetrailers' element={<BrowseTrailers/>}></Route>
        </Route>
      </Routes>
      <Routes>
        <Route path='/signin/signin_with_imdb' element={<SigninWithIMDb setAuthButton={setAuthButton} />}></Route>
        <Route path='/create_account' element={<CreateAccount/>}></Route>
        <Route path='/create_account/otp_verification' element={<OTPVerification watchlistMoviesCount={watchlistMoviesCount} setAuthButton={setAuthButton}/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
    </GoogleOAuthProvider>
  );
}

export default App;
