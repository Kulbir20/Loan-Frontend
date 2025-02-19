import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const images = [
  { src: "/images/nature.jpg", alt: "Nature 1" },
  { src: "/images/nature2.jpg", alt: "Nature 2" },
  { src: "/images/nature3.jpg", alt: "Nature 3" },
];

const ImgSlider = () => {
  const [index, setIndex] = useState(0);
  const [autoslide, setAutoSlide] = useState(true);

  const handleSelect = (selectedIndex,manual) => {
    setIndex(selectedIndex);
    if(manual===false)
    {
        setAutoSlide(false)
    }
    
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      controls={false}
      indicators={false}
      interval={autoslide?3000:null}
      fade
      pause={false}
      style={{ width: "100%", height: "500px", margin: "0 auto" }}
    >
      {images.map((image, i) => (
        <Carousel.Item key={i}>
          <div style={{ position: "relative", height: "450px", width: "100%", overflow: "hidden" }}>
            <img
              className="d-block w-100"
              src={image.src}
              alt={image.alt}
              style={{
                height: "500px",
                objectFit: "cover",
                filter: "brightness(60%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "50px",
                left: "50px",
                color: "white",
                textAlign: "left",
                maxWidth: "60%",
              }}
            >
              <h3 style={{ fontSize: "2rem", fontWeight: "bold" }}>United Kingdom</h3>
              <p style={{ fontSize: "1rem", lineHeight: "1.5" }}>
                The United Kingdom of Great Britain and Northern Ireland is an island country in Northwestern Europe.
              </p>
            </div>

            <div
              style={{
                position: "absolute",
                bottom: "20px",
                right: "20px",
                display: "flex",
                background: "black",
                border:"2px solid black",
                padding: "0px",
                borderRadius: "15px",
                boxShadow: "0px 4px 10px black",
              }}
            >
              {images.map((thumb, thumbIndex) => (
                <img
                  key={thumbIndex}
                  src={thumb.src}
                  alt={thumb.alt}
                  onClick={() => handleSelect(thumbIndex,false)}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    cursor: "pointer",
                    borderRadius: "12px",
                    border: "3px solid black" ,
                    transition: "0.3s ease",
                    boxShadow: "0px 3px 6px black",
                  }}
                />
              ))}
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImgSlider;
