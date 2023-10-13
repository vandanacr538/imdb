import React from 'react'
import './footer.css';
import { Facebook, Instagram, Telegram, Twitter, YouTube } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate=useNavigate();
  return (
    <>
        <footer>
            <button className='footer-signin-btn' onClick={()=>navigate("/login")}>Sign in for more access</button>
            <div className='footer-smlinks'>
                <a href='https://www.instagram.com/imdb/' target='blank' className='footer-sm-link'><Instagram /></a>
                <a href='https://twitter.com/imdb' target='blank' className='footer-sm-link'><Twitter /></a>
                <a href='https://www.youtube.com/imdb' target='blank' className='footer-sm-link' ><YouTube /></a>
                <a href='https://www.facebook.com/imdb' target='blank' className='footer-sm-link'><Facebook /></a>
            </div>
            <p>an amazon company</p>
            <p className='footer-copyright'>© 1990-2023 by IMDb.com, Inc.</p>
        </footer>
    </>
  )
}
