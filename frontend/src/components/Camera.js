import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react";

function Camera() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  // create a capture function
  const capture = useCallback(() => {
    console.log('Starting the callback')
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    console.log(imageSrc)
    const buffer = imageSrc.arrayBuffer()
    const bytesArray = new Uint8Array(buffer)
    console.log(bytesArray)
  }, [webcamRef, imgSrc]);



  return (
    <div className="camera">
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" />
      ) : (
        <Webcam height={600} width={600} ref={webcamRef} />
      )}
      <div className="btn-container">
        <button onClick={()=>capture()}>Capture photo</button>
      </div>
    </div>
  );
}

export default Camera
