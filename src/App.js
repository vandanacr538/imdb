import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Ad from './Components/Advertisement/Ad';
import Header from './Components/Header/Header';
import Main from './Components/Main/Main';
import MovieCarousel from './Components/MovieCarousel/MovieCarousel';
import ProtectedLayout from './Components/ProtectedLayout/ProtectedLayout';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Header/>
      <Ad/>
      <Main/>
      <h1 style={{color:"#f5c518", marginLeft:"49px"}}>What to watch</h1>
      <MovieCarousel heading="Top Picks" api="https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1"></MovieCarousel>
      <MovieCarousel heading="Popular" api="https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"></MovieCarousel>
      <Routes>
        <Route path="/" element={<ProtectedLayout/>}>
          <Route path="/" element={<MovieCarousel 
          heading="From Your Watchlist" 
          api="https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"/>}>
          </Route>
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
