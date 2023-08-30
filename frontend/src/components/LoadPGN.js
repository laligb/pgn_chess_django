import React, {useState, useEffect, useCallback} from 'react';
import {PGN} from './pgn_example';
import Chess from "chess.js";
import { Chessboard } from "react-chessboard";
import { Link} from 'react-router-dom'


function LoadPGN() {


  const PGN = [
    '[Event "Casual Game"]',
    '[Site "Berlin GER"]',
    '[Date "1852.??.??"]',
    '[EventDate "?"]',
    '[Round "?"]',
    '[Result "1-0"]',
    '[White "Adolf Anderssen"]',
    '[Black "Jean Dufresne"]',
    '[ECO "C52"]',
    '[WhiteElo "?"]',
    '[BlackElo "?"]',
    '[PlyCount "47"]',
    '',
    '1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.b4 Bxb4 5.c3 Ba5 6.d4 exd4 7.O-O',
    'd3 8.Qb3 Qf6 9.e5 Qg6 10.Re1 Nge7 11.Ba3 b5 12.Qxb5 Rb8 13.Qa4',
    'Bb6 14.Nbd2 Bb7 15.Ne4 Qf5 16.Bxd3 Qh5 17.Nf6+ gxf6 18.exf6',
    'Rg8 19.Rad1 Qxf3 20.Rxe7+ Nxe7 21.Qxd7+ Kxd7 22.Bf5+ Ke8',
    '23.Bd7+ Kf8 24.Bxe7# 1-0',
  ]




  const [game, setGame] = useState(new Chess());
  //const [fen, setFen] = useState(game.fen());
  const [fenList, setFenList] = useState([]);
  const [moveIndex, setMoveIndex] = useState(0);


  let moves_pgn = game.load_pgn(PGN.join('\n'));
  const moves = game.history({ verbose: true });


  /*

  1. create notation list of fen positions. [fen0, fen1, fen2...]
  2. connect each fen with index of move. (index + 1 is number of move)

  */

  console.log(fenList[moveIndex])
  console.log(moveIndex+1)
  console.log(game)

  console.log(moves[0].to) //returns the move


  // Creating list of moves in current position
  let move_list = []
  let temp = ""
  for (let i of moves){
    console.log(typeof(i.to))
    temp = temp + " " + i.to
    move_list.push(temp)

  }
  console.log(move_list)


 // From moves list creating fen list
 // const [tempGame, setTempGame] = useState(new Chess());
  // const updatedFenList = [];
  // for (let current_moves of move_list){
  //   console.log(current_moves)
  //   const tempGame = new Chess(game.fen());
  //   tempGame.load_pgn(current_moves)

  //   updatedFenList.push(tempGame.fen());

  // }

  // setFenList(updatedFenList)


  console.log(fenList)
  // console.log(game.fen())

  const handlePreviousMove = () => {
    if (moveIndex > 0) {
      setMoveIndex(moveIndex - 1);
    }
  };

  const handleNextMove = () => {
    if (moveIndex < moves.length) {
      setMoveIndex(moveIndex + 1);
    }
  };



  return (
    <div className='row d-flex justify-content-center'>
     <Link to="/camera" className="scan-photo"><h2>SCAN YOUR CHESS GAME SCORESHEET</h2></Link>
      <div className="col-lg-6 col-md-6 col-sm-10">

        <Chessboard
          position={fenList[moveIndex]}
          //position={tempGame.fen()}
        />

          <button onClick={handlePreviousMove} disabled={moveIndex === 0}>
            Previous Move
          </button>
          <button
            onClick={handleNextMove}
            disabled={moveIndex >= fenList.length - 1}
          >
            Next Move
          </button>

         <div className='notation'>{moves[moveIndex]?.san}</div>
        </div>

      <div className="col-lg-6 col-md-6 col-sm-10">
        {game.pgn()}
        </div>
    </div>
  )
}

export default LoadPGN
