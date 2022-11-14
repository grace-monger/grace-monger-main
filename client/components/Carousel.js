import React from "react";

const photos = [
  "pexels-nastyasensei-821365.jpg",
  "pexels-ray-piedra-1545529.jpg",
  "pexels-polina-tankilevitch-4187777.jpg",
];

const Carousel = () => {
  return (
    <div className="slideshow">
      <div className="slideshowSlider">
        <img width="100%" src="pexels-nastyasensei-821365.jpg" />
      </div>
      <div className="mySlides fade">
        <img width="100%" src="pexels-ray-piedra-1545529.jpg" />
      </div>
      <div className="mySlides fade">
        <img width="100%" src="pexels-polina-tankilevitch-4187777.jpg" />
      </div>
      {/* <a className="prev" onClick={plusSlides(-1)}>
        &#10094;
      </a>
      <a className="next" onClick={plusSlides(1)}>
        &#10095;
      </a> */}
    </div>
  );
};

export default Carousel;
