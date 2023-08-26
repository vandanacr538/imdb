import React from 'react'
import Main from '../Main/Main'
import MovieCarousel from '../MovieCarousel/MovieCarousel'
import { Suspense, lazy } from 'react';
import FallbackComp from '../FallbackComp/FallbackComp';
import { Route, Routes } from 'react-router-dom';
import ProtectedLayout from '../ProtectedLayout/ProtectedLayout';

const Explore=lazy(()=>import('../Explore/Explore'));

export default function MainComp() {
  return (
    <div>
        <Main/>
        <h1 style={{color:"#f5c518", marginLeft:"49px"}}>What to watch</h1>
        <MovieCarousel heading="Top Picks" api="https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1"></MovieCarousel>
        <Routes>
          <Route path="/" element={<ProtectedLayout/>}>
            <Route path="/" element={<MovieCarousel 
            heading="From Your Watchlist" 
            api="https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"/>}>
            </Route>
          </Route>
        </Routes>
        <MovieCarousel heading="Popular" api="https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"></MovieCarousel>
        <Suspense fallback={<FallbackComp/>}>
            <Explore/>
        </Suspense>
    </div>
  )
}
