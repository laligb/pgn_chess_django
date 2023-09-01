// Algorithm to find missed move
const { Chess } = require("chess.js");


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
  'd3 8.Qb3 Qf6 9.e5 Qg6 10.  Nge7 11.Ba3 b5 12.Qxb5 Rb8 13.Qa4',
  'Bb6 14.Nbd2 Bb7 15.Ne4 Qf5 16.Bxd3 Qh5 17.Nf6+ gxf6 18.exf6',
  'Rg8 19.Rad1 Qxf3 20.Rxe7+ Nxe7 21.Qxd7+ Kxd7 22.Bf5+ Ke8',
  '23.Bd7+ Kf8 24.Bxe7# 1-0',
]

const game = new Chess();
const pgnString = PGN.join('\n');
game.load_pgn(pgnString, { strict: true })
const moves = game.history({ verbose: true });
//console.log(moves)

const missedGame = new Chess();
const pgnStringMissed = missedPGN.join('\n');
missedGame.load_pgn(pgnStringMissed, { strict: true })
const missedMoves = missedGame.history({ verbose: false });
console.log(missedMoves)
console.log(game.fen())



const missed = missedGame.history({ verbose: false });
let legalMoves = missedGame.moves()



let gamesVersion = []
for (let i=0; i<legalMoves.length; i++){
  const copiedMissedGame = new Chess();
  copiedMissedGame.load(missedGame.fen());
  let copiedMissPGN = pgnStringMissed;

  copiedMissPGN = copiedMissPGN.replace(`10.`, `10.${legalMoves[i]}`);


  copiedMissedGame.load_pgn(copiedMissPGN)
  gamesVersion.push(copiedMissedGame)
}


let temp= 0;
let length =0;
let version = '';
let bestMove = '';
for (let i=0; i<legalMoves.length; i++){
  let versionHistory = gamesVersion[i].history({ verbose: false })
  // console.log(`${i}. ${versionHistory[i]}`)

  if (versionHistory.length > length){
    temp = i
    length = versionHistory.length;
    version = versionHistory;
    bestMove = version[18]
  }
}

console.log(temp)
console.log(version)
console.log(bestMove)
