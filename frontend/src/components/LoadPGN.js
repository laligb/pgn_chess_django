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
  const currentMove = moves[moveIndex] || {};

  game.load_pgn(PGN.join('\n'));

  const handleMove = (move) => {
    if (game.move(move)) {
      setFen(game.fen());
      setMoveIndex(moveIndex + 1);
    }
  };

  const handleKeyboardInput = (event) => {
    if (event.key === 'ArrowLeft') {
      handlePreviousMove();
    } else if (event.key === 'ArrowRight') {
      handleMove(moves[moveIndex + 1]);
    }
  };

  useEffect(() => {
    game.load_pgn(PGN.join('\n'));
    setFen(game.fen());

    window.addEventListener('keydown', handleKeyboardInput);
    return () => {
      window.removeEventListener('keydown', handleKeyboardInput);
    };
  }, []);


  const handlePreviousMove = () => {
    if (moveIndex > 0) {
      game.undo();
      setFen(game.fen());
      setMoveIndex(moveIndex - 1);
    }
  };

  return (
    <div className='custom-chessboard'>
      <Chessboard
        // position={game.fen()}
        onDrop={(move) =>
          handleMove({
            from: move.sourceSquare,
            to: move.targetSquare,
            promotion: 'q', // Default promotion to queen
          })

        }
        onClick={(event) =>
          handleKeyboardInput({


          })
        }
      />
      <div>

      {moves.map((move, index) => (
          <button key={index} onClick={() => handleMove(move)}>
            {move.san}
          </button>
        ))}

        <div>

        <button
          onClick={() => handleMove(moves[moveIndex + 1])}
          disabled={moveIndex >= moves.length - 1}
        >
          Next Move
        </button>
      </div>
    </div>

      <div className="notation">{game.pgn()}</div>
    </div>
  )
}

export default LoadPGN
