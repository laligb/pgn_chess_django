import { createContext, useContext, useReducer } from "react";

const chessContext = createContext();
const initialState = {
  imgSrc : null,
  fens : [],
  loading : false,
  responsePGN : [],
  file: null

}

function reducer(state, action){
  switch (action.type) {
    case "imgSrc/set":
      return {...state, imgSrc: action.payload };
    case "fens/set":
      return {...state, fens: action.payload };
    case "loading/set":
      return {...state, loading: action.payload };
    case "responsePGN/set":
      return {...state, responsePGN: action.payload };
    case "file/set":
      return {...state, file: action.payload };
    case "reset":
      return initialState

    default:
      throw new Error (`Not known action type ${action.type}`)
  }
}

//Pseudocomnonent = Provider!
function ChessProvider({children}){
  const [state, dispatch] = useReducer(reducer, initialState);
  const {imgSrc, fens,  loading, responsePGN, file} = state; //Unpacked state
  //Dispach is function which updates all these states

  return (
    <chessContext.Provider value={{imgSrc, fens,  loading, responsePGN, file, dispatch}}>
      {children}
    </chessContext.Provider>
  )
}

function useChess(){
  const context = useContext(chessContext);
  return context;
}

export {ChessProvider, useChess};
