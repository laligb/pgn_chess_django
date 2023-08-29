import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react";


function Camera() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);



  // create a capture function
  const capture = useCallback(async () => {
    console.log('Starting the callback')
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);

    const response = await fetch('https://chess-yarc62mhna-ew.a.run.app', {
      method: 'POST',
      body: JSON.stringify(imageSrc),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    // const result = await response.json();

    let image = new Image()
    image.src = imageSrc

  }, [webcamRef, imgSrc]);







  return (
    <div className="camera">
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" />
      ) : (
        <Webcam
        height={600} width={600} ref={webcamRef}
        screenshotFormat="image/png" />
      )}
      <div className="btn-container">
        <button onClick={()=>capture()}>Capture photo</button>
      </div>
    </div>
  );
}

export default Camera
