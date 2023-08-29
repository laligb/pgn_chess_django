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


    // var binary_string = window.atob(imageSrc);;
    // var len = binary_string.length;
    // var bytes = new Uint8Array(len);
    // for (var i = 0; i < len; i++) {
    //     bytes[i] = binary_string.charCodeAt(i);
    // }
    // console.log(bytes.buffer)

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
