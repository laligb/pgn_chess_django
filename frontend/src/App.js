import React from 'react';
import './App.css';
import Camera from './components/Camera';
import PlayRandomMoveEngine from './components/PlayRandomMoveEngine';
import LoadPGN from './components/LoadPGN';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './components/Nav';
import {Routes, Route, Link } from "react-router-dom";
import UploadImage from './components/UploadImage';

function App() {
  return (
    <div className="App">
      <header className="">

        {/* USECONTEXT TO USE FOR */}
       <Nav />
        </header>
      <div className="container">


        <Routes>
          <Route path="/" element={ <Camera />} />
          <Route path="/upload" element= { <UploadImage/>}/>
        </Routes>

          {/* <PlayRandomMoveEngine /> */}


      </div>
      <footer className='footer navbar-custom'>
          <p>Lali Bibilashvili, Amanda Aurora, David Rosillo</p>
        </footer>
    </div>
  );
}

export default App;
