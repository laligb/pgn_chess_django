import React, {useState} from 'react'
import {PGN} from './pgn_example'
import Chess from "chess.js";
import { Chessboard } from "react-chessboard";
import PlayRandomMoveEngine from './PlayRandomMoveEngine';

function showPGN() {

  return (
    <div>{PlayRandomMoveEngine.load_pgn(PGN.join('\n'))}</div>
  )
}

export default showPGN
