import React, {useState} from 'react'
import Chess from "chess.js";
import LoadPGN from "./LoadPGN";

function UploadImage() {
  const [file, setFile] = useState();
  const [imgSrc, setImgSrc] = useState(null);
  const [fens, setFens] = useState([]);
  const [responsePGN, setResponsePGN] = useState([])

  function handleChange(e) {
    console.log(e.target.files);
    const image_file = URL.createObjectURL(e.target.files[0])
    setFile(image_file)
    setImgSrc(image_file);
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
      setResponsePGN(pgn);

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
      setFens(fenList);
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
    <div>
      <div className="upload btn-container mt-4">
          <h2>Upload Chess Scoresheet:</h2>
          <input type="file" onChange={handleChange} className='rounded bg-slate-300 px-4 py-2 text-black'/>
          <img src={file} />
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
