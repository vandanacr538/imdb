import React, { useEffect, useState } from 'react'
import './footer.css';
import { Facebook, Instagram, Twitter, YouTube } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const [signInBtnFooter, setSignInBtnFooter] = useState(true);
  const navigate=useNavigate();
  
  useEffect(()=>{
    if(localStorage.getItem("token")){
      setSignInBtnFooter(false);
    }
  },[])
  return (
    <>
        <footer>
            {signInBtnFooter ? (
              <button
                className="footer-signin-btn"
                onClick={() => navigate("/signin")}
              >
                Sign in for more access
              </button>
            ) : (
              <></>
            )}
            <div className='footer-smlinks'>
                <a href='https://www.instagram.com/imdb/' target='blank' className='footer-sm-link'><Instagram /></a>
                <a href='https://twitter.com/imdb' target='blank' className='footer-sm-link'><Twitter /></a>
                <a href='https://www.youtube.com/imdb' target='blank' className='footer-sm-link' ><YouTube /></a>
                <a href='https://www.facebook.com/imdb' target='blank' className='footer-sm-link'><Facebook /></a>
            </div>
            <p>an amazon company</p>
            <p className='footer-copyright'>© 2023, IMDb Clone, Made by Vandana.</p>
        </footer>
    </>
  )
}
