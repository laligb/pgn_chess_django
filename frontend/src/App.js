import React from 'react';
import './App.css';
import Camera from './components/Camera';
import PlayRandomMoveEngine from './components/PlayRandomMoveEngine';
import LoadPGN from './components/LoadPGN';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './components/Nav';
import {Routes, Route, Link } from "react-router-dom";

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
        </Routes>

          {/* <PlayRandomMoveEngine /> */}

      </div>
    </div>
  );
}

export default App;
