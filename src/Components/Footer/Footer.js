import React from 'react'
import './footer.css';
import { Facebook, Instagram, Telegram, Twitter, YouTube } from '@mui/icons-material';

export default function Footer() {
  return (
    <>
        <footer>
            <button className='footer-signin-btn'>Sign in for more access</button>
            <div className='footer-smlinks'>
                <a href='' className='footer-sm-link'><Instagram /></a>
                <a href='' className='footer-sm-link'><Twitter /></a>
                <a href='' className='footer-sm-link'><YouTube /></a>
                <a href='' className='footer-sm-link'><Facebook /></a>
                <a href='' className='footer-sm-link'><Telegram /></a>
            </div>
            <div className='footer-menu'>
                <a href=''>Get the IMDb App</a>
                <a href=''>Help</a>
                <a href=''>Site Index</a>
                <a href=''>IMDb Pro</a>
                <a href=''>Box Office Mojo</a>
                <a href=''>IMDb Developer</a>
                <a href=''>Press Room</a>
                <a href=''>Advertising</a>
                <a href=''>Jobs</a>
                <a href=''>Condition of Use</a>
                <a href=''>Privacy Policy</a>
                <a href=''>Your Ads Privacy Choices</a>
            </div>
            <p>an amazon company</p>
            <p className='footer-copyright'>© 1990-2023 by IMDb.com, Inc.</p>
        </footer>
    </>
  )
}
