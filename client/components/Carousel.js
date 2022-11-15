import React from "react";

const photos = [
  "pexels-nastyasensei-821365.jpg",
  "pexels-rodnae-productions-6004726.jpg",
  "pexels-polina-tankilevitch-4187777.jpg",
];
const delay = 5000;

const Carousel = () => {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === photos.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );
    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow-container">
      <div className="slideshow">
        <div
          className="slideshowSlider"
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >
          {photos.map((photo, index) => (
            <div className="slide" key={index}>
              <img src={photo} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
