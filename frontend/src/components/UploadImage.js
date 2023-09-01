import React, {useState} from 'react'
import Chess from "chess.js";
import LoadPGN from "./LoadPGN";
import { useChess } from "../contexts/ChessContext";

function UploadImage() {
  // const [file, setFile] = useState();
  // const [imgSrc, setImgSrc] = useState(null);
  // const [fens, setFens] = useState([]);
  // const [responsePGN, setResponsePGN] = useState([])
  const {imgSrc, fens,  loading, responsePGN, file, dispatch} = useChess();


  function handleChange(e) {
    console.log(e.target.files);
    const image_file = URL.createObjectURL(e.target.files[0])
    dispatch({type: "file/set", payload: image_file});
    dispatch({type: "imgSrc/set", payload: image_file});
    console.log(imgSrc);
}


   async function OnClick() {
    console.log("Starting the callback");

    try {
      const imageBlob = await (await fetch(imgSrc)).blob();

      const formData = new FormData();
      formData.append("img", imageBlob, "image.png");

      const response = await fetch(
        "https://chess-yarc62mhna-ew.a.run.app/upload",
        {
          method: "POST",
          body: formData,
        },
      );
      const pgn = await response.json();
      console.log(pgn);
      dispatch({type: "responsePGN/set", payload: pgn});

      const game = new Chess();
      const fenList = [];
      const replacedPgn = pgn
        .replace(/0-0-0/g, "O-O-O")
        .replace(/0-0/g, "O-O")
        .trim();
      const cleanPgn = replacedPgn
        .replace(/\d+\./g, "")
        .replace(/[\r\n]+/g, " ");
      const moves = cleanPgn.split(" ");


      for (let i = 0; i < moves.length; i++) {
        game.move(moves[i], { sloppy: true });
        fenList.push(game.fen());
      }
      dispatch({type: "fens/set", payload: fenList})
      console.log(fenList);
      if (response.ok) {
        console.log("Image uploaded successfully");
      } else {
        console.log("Image upload failed");
      }
    } catch (error) {
      console.log("Error:", error.message);
    } finally {
      console.log("Finished fetch");

    }
  }

  return (
    <div  className="row flex items-center">
      <div className="upload btn-container mt-4">
          <h2>Upload Chess Scoresheet:</h2>
          <input type="file" onChange={handleChange} className='rounded bg-slate-300 px-4 py-2 text-black'/>
          <div className='row '>
          <div className='col-lg-3 col-md-10 col-sm-10'></div>
            <img src={file} className='col-lg-6 col-md-10 col-sm-10'/>
          </div>
      </div>

      <div className="btn-container mt-4">
        <button
              onClick={OnClick}
              className="rounded bg-slate-300 px-4 py-2 text-black"
        >
        API request
        </button>
      </div>

    </div>
  )
}

export default UploadImage
