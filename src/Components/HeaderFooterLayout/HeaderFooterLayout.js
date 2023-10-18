import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function HeaderFooterLayout(props) {
  const {authButton, watchlistMoviesCount, setWatchlistMoviesCount}=props;
  return (
    <div>
        <Header authButton={authButton} watchlistMoviesCount={watchlistMoviesCount} setWatchlistMoviesCount={setWatchlistMoviesCount}/>
        <Outlet/>
        <Footer/>
    </div>
  )
}
