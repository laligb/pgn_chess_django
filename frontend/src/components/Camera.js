import Webcam from "react-webcam";
import { useRef, useState } from "react";

function Camera() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [loading, setLoading] = useState(false);

  async function OnClick() {
    console.log("Starting the callback");
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    setLoading(true);

    try {
      // Convert the base64 image data to a binary blob
      const imageBlob = await (await fetch(imageSrc)).blob();

      // Create a FormData object to send the image as a binary file
      const formData = new FormData();
      formData.append("image", imageBlob, "image.png");

      const response = await fetch("https://chess-yarc62mhna-ew.a.run.app/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Image uploaded successfully");
      } else {
        console.log("Image upload failed");
      }
    } catch (error) {
      console.log("Error:", error.message);
    } finally {
      console.log("Finished fetch");
      setLoading(false);
    }
  }

  return (
    <div className='row' >
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" />
      ) : (
        <Webcam
          height={578}
          width={483}
          ref={webcamRef}
          screenshotFormat="image/png"
        />
      )}
      <div className="btn-container">
        <button onClick={OnClick}>Capture photo</button>
      </div>
    </div>
  );
}

export default Camera;

// 1: 1.166667
// width - 1450
// height - 1734
