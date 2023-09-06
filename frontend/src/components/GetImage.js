import React from 'react'
import Webcam from "react-webcam";
import { useChess } from "../contexts/ChessContext";
import LoadPGN from './LoadPGN';
import { useRef } from 'react';

function GetImage() {

  const webcamRef = useRef(null);

  const {fens,  loading, responsePGN, file, dispatch, OnClick, isBoard} = useChess();

  // Upload Image
  function handleChange(e) {
    console.log(e.target.files);
    const image_file = URL.createObjectURL(e.target.files[0])
    dispatch({type: "file/set", payload: image_file});
    dispatch({type: "imgSrc/set", payload: image_file});
    console.log(responsePGN, "Response Pgn");
    console.log(fens, "fens");
}

  return (
    <>
      {isBoard ? (
        <div>
          {loading ? (
            <div className="mt-4 flex items-center justify-center">
              <progress className="progress-bar w-full" max="100"></progress>
              <div className="ml-4">Processing...</div>
            </div>
          ) : null}

          <LoadPGN fens={fens} />
        </div>
      ) : (
        <div className="row camera flex items-center">
            <div>
          <Webcam
            height={600}
            width={600}
            ref={webcamRef}
            screenshotFormat="image/png"
          />
          <div className="btn-container mt-4">
            <button
              onClick={OnClick}
              className="rounded bg-slate-300 px-4 py-2 text-black"
            >
              Capture photo
            </button>
            </div>

          </div>

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
                    onClick={()=>OnClick()}
                    className="rounded bg-slate-300 px-4 py-2 text-black"
              >
              API request
              </button>
            </div>
          </div>


        </div>


      )}
    </>
  )
}

export default GetImage
