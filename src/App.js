import './App.css';
import Ad from './Components/Advertisement/Ad';
import Header from './Components/Header/Header';
import Main from './Components/Main/Main';
import MovieCarousel from './Components/MovieCarousel/MovieCarousel';

function App() {
  return (
    <div>
      <Header/>
      <Ad/>
      <Main/>
      <h1 style={{color:"#f5c518", marginLeft:"49px"}}>What to watch</h1>
      <MovieCarousel heading="Top Picks" api=""/>
    </div>
  );
}

export default App;
