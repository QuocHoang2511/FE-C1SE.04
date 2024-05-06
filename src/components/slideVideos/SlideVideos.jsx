import React, { useRef } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import samplevideos from "../../assets/videos/3438337670292856404.mp4";

const SlideImages = () => {
    const videoRef = useRef(null);

    const handleVideoEnd = () => {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    };
  return (
    <div className="">
        <div className=" mt-6 w-full h-[400px] shadow overflow-hidden flex items-center justify-center">
       <video
          ref={videoRef}
          className="rounded-md max-w-full h-full object-cover transition-all hover:cursor-pointer hover:scale-110"
          src={samplevideos}
          type="video/mp4"
          controls={false}
          autoPlay
          muted
          onEnded={handleVideoEnd}
      />
    </div>
    </div>
  );
};

export default SlideImages;
