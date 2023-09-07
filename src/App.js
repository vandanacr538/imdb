import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainComp from './Components/MainComp/MainComp';
import Play from './Pages/Play/Play';
import Header from './Components/Header/Header';
import Ad from './Components/Advertisement/Ad';
import Footer from './Components/Footer/Footer';
import Login from './Pages/Login/Login';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId='484151294674-jno436mqufdpsenrg2csnllfdpu8f1g8.apps.googleusercontent.com'>
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
    </GoogleOAuthProvider>
  );
}

export default App;
