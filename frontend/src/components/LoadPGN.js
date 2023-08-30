import React, {useState, useEffect} from 'react';
import {PGN} from './pgn_example';
import Chess from "chess.js";
import { Chessboard } from "react-chessboard";


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
  const [fen, setFen] = useState(game.fen());
  const [moveIndex, setMoveIndex] = useState(24);

  const moves = game.history({ verbose: true });
  let moves_pgn = game.load_pgn(PGN.join('\n'));

  console.log(moves)
  console.log(moves_pgn)

  /*

  1. create notation list of fen positions. [fen0, fen1, fen2...]
  2. connect each fen with index of move. (index + 1 is number of move)
  3.

  */

  useEffect(() => {
    game.load_pgn(PGN.join('\n'));
    setFen(game.fen());
  }, []);


  const handlePreviousMove = () => {
    if (moveIndex > 0) {
      setMoveIndex(moveIndex - 1);
      game.undo();
      setFen(game.fen());
    }
  };

  const handleNextMove = () => {
    if (moveIndex < moves.length) {
      game.move(moves[moveIndex]);
      setFen(game.fen());
      setMoveIndex(moveIndex + 1);
    }
  };

  return (
    <div className='custom-chessboard'>
    <Chessboard position={fen} />
    <div>
      <button onClick={handlePreviousMove} disabled={moveIndex === 0}>
        Previous Move
      </button>
      <button
        onClick={handleNextMove}
        disabled={moveIndex >= moves.length}
      >
        Next Move
      </button>
    </div>
    <div className='notation'>{moves[moveIndex]?.san}</div>


      <div className="notation">{game.pgn()}</div>
    </div>
  )
}

export default LoadPGN
