import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainComp from './Components/MainComp/MainComp';
import Play from './Components/Play/Play';
import Header from './Components/Header/Header';
import Ad from './Components/Advertisement/Ad';

function App() {
  return (
    <div>
      <Header/>
      <Ad/>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainComp/>}></Route>
        <Route path='/play/:id' element={<Play/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
