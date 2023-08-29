import React from 'react';
import './App.css';
import Camera from './components/Camera';
import PlayRandomMoveEngine from './components/PlayRandomMoveEngine';
import LoadPGN from './components/LoadPGN';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Digitization Handwritten Chess Game Scoresheets</h1>
        </header>
      <div className="container">

        <PlayRandomMoveEngine />
        <Camera />
        <LoadPGN />

      </div>
    </div>
  );
}

export default App;
