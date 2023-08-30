import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainComp from './Components/MainComp/MainComp';
import Play from './Pages/Play/Play';
import Header from './Components/Header/Header';
import Ad from './Components/Advertisement/Ad';
import Footer from './Components/Footer/Footer';
import Login from './Pages/Login/Login';

function App() {
  return (
    <div>
      <Header/>
      <Ad/>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainComp/>}></Route>
        <Route path='/play/:id' element={<Play/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
