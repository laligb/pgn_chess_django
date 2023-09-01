import React from 'react';
import './App.css';
import Camera from './components/Camera';
import PlayRandomMoveEngine from './components/PlayRandomMoveEngine';
import LoadPGN from './components/LoadPGN';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './components/Nav';
import {Routes, Route, Link } from "react-router-dom";
import UploadImage from './components/UploadImage';
import { ChessProvider } from './contexts/ChessContext';
import CameraLayout from './components/CameraLayout';
import UploadImageLayout from './components/UploadImageLayout';

function App() {
  return (

    <div className="App">

          <ChessProvider>
          <Routes>

            <Route path="/" element={ <CameraLayout />} />
            <Route path="/upload" element= { <UploadImageLayout/>}/>
          </Routes>
          </ChessProvider>

          {/* <PlayRandomMoveEngine /> */}

      <footer className='footer navbar-custom'>
          <p>Lali Bibilashvili, Amanda Aurora, David Rosillo</p>
        </footer>
    </div>
  );
}

export default App;
