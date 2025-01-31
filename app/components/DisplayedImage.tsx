
import React,{useEffect,useState} from "react";

function DisplayedImage({ imagePath,alt }) {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    setImageSrc(imagePath); // Set the dynamic image after hydration
  }, [imagePath]);

  return <img className="planet__image " src={imageSrc} alt={alt} />;
}

export default DisplayedImage;





