// Algorithm to find missed move
const { Chess } = require("chess.js");
const fs = require('fs');


let pgnHeader = [
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
]


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

//Missed move #10
const missedPGN= [
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
  'd3 8.Qb3 Qf6 9.e5 Qg6 10. Nge7 11.Ba3 b5 12.Qxb5 Rb8 13.Qa4',
  'Bb6 14.Nbd2 Bb7 15.Ne4 Qf5 16.Bxd3 Qh5 17.Nf6+ gxf6 18.exf6',
  'Rg8 19.Rad1 Qxf3 20.Rxe7+ Nxe7 21.Qxd7+ Kxd7 22.Bf5+ Ke8',
  '23.Bd7+ Kf8 24.Bxe7# 1-0',
]


function returnMissedMove(pgn){
  const missedGame = new Chess();
  const pgnString = pgn.join('\n');
  missedGame.load_pgn(pgnString, { strict: true })

  const missedFull = missedGame.history({verbose: true})
  console.log("index of missed move ", Math.floor(missedFull.length/2 + 1))
  let indexOfMissedMove = missedFull.length;

  let legalMoves = missedGame.moves()
  let gamesVersion = allMovesToGames(missedGame, pgnString, legalMoves, indexOfMissedMove);
  let bestVersion =  findBestMove(gamesVersion, indexOfMissedMove,legalMoves)
  let restoredPGN = createNewPGN(pgnString, indexOfMissedMove, bestVersion[1]);

  console.log(bestVersion[1]);
  console.log(restoredPGN);

  return restoredPGN;
}

// Returns all possible games with legal moves
function allMovesToGames(missedGame, pgn, legalMoves, indexOfMissedMove){
  let gamesVersion = []
  for (let i=0; i<legalMoves.length; i++){
    const copiedMissedGame = new Chess();
    copiedMissedGame.load(missedGame.fen());
    let copiedMissPGN = pgn;

    let moveNumber = Math.floor(indexOfMissedMove/2) + 1;
    if (indexOfMissedMove % 2 === 0){
      copiedMissPGN = copiedMissPGN.replace(`${moveNumber}.`, `${moveNumber}.${legalMoves[i]}`);
    }else{
      console.log(`${moveNumber + 1}.`)
      copiedMissPGN = copiedMissPGN.replace(`${moveNumber + 1}.`, `${legalMoves[i]} ${moveNumber}.`);
    }

    copiedMissedGame.load_pgn(copiedMissPGN)
    gamesVersion.push(copiedMissedGame)
  }

  return gamesVersion;
}

// Finds Best Move and returns best version of game
function findBestMove(gamesVersion, indexOfMissedMove,legalMoves ){
  let length =0;
  let version = [];
  let bestMove = '';
  for (let i=0; i<legalMoves.length; i++){
    let versionHistory = gamesVersion[i].history({ verbose: false })

    if (versionHistory.length > length){
      length = versionHistory.length;
      version = versionHistory;
      bestMove = version[indexOfMissedMove]
    }
  }
  return [version, bestMove];
}

// Combine to PGN file
function createNewPGN(initialPGN, indexOfMissedMove, bestMove){
  let finalPGN = "";
  let moveNumber = Math.floor(indexOfMissedMove/2) + 1;

  if (indexOfMissedMove % 2 === 0){
    finalPGN = initialPGN.replace(`${moveNumber}.`, `${moveNumber}.${bestMove}`);
  }else{
    console.log(`${moveNumber + 1}.`)
    finalPGN = initialPGN.replace(`${moveNumber + 1}.`, `${bestMove} ${moveNumber}.`);
  }

  fs.writeFile('public/games/game.pgn', finalPGN, err => {
    if (err) {
      console.error(err); // Handle the error if one occurs
    } else {
      console.log('Data has been written to the file.'); // File written successfully
    }
  });
  return finalPGN;
}

export default returnMissedMove;
