import React, { useEffect, useRef, useState } from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from 'axios'

const videos = [
    { src: "/videos/nature1v.mp4", alt: "Nature 1" },
    { src: "/videos/nature2v.mp4", alt: "Nature 2" },
    { src: "/videos/nature3v.mp4", alt: "Nature 2" }
];

const Slider = () => {
    const [index, setIndex] = useState(0);
    const CarouselRef=useRef()
    const[selectedLocation,setSelectedLocation]=useState("67a724c322158265248b1dd1");

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };
    const handleVideoEnd = () => {
        const nextIndex = (index + 1) % videos.length;
        setIndex(nextIndex);
    };

    useEffect(() => {
        if (CarouselRef.current) {
            CarouselRef.current.next(); 
        }
    }, [index]);

    const fetchdata=async()=>
    {
        try
        {
            const resp=await axios.get(`https://apiimmigin.singlemindinfo.com/api/countryVisa/country/${selectedLocation}`)
            console.log(resp)

        }
        catch(err)
        {

        }
    }

    useEffect(()=>
    {
        fetchdata()
    },[])

    return (
        <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            controls={false}
            indicators={false}
            fade
            style={{ width: "100%", height: "500px", margin: "0 auto" }}
        >
            {videos.map((video, i) => (
                <Carousel.Item key={i}>
                    <div style={{ position: "relative", height: "450px", width: "100%", overflow: "hidden" }}>
                        <video
                            className="d-block w-100"
                            src={video.src}
                            alt={video.alt}
                            autoPlay
                            muted
                            playsInline
                            onEnded={handleVideoEnd}
                            style={{
                                height: "500px",
                                objectFit: "cover",
                                filter: "brightness(60%)",
                            }}
                        >
                            Your browser does not support the video tag.
                        </video>
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
                                border: "2px solid black",
                                padding: "0px",
                                borderRadius: "15px",
                                boxShadow: "0px 4px 10px black",
                            }}
                        >
                            {videos.map((thumb, thumbIndex) => (
                                <video
                                    key={thumbIndex}
                                    src={thumb.src}
                                    alt={thumb.alt}
                                    onClick={() => handleSelect(thumbIndex, false)}
                                    style={{
                                        width: "80px",
                                        height: "80px",
                                        objectFit: "cover",
                                        cursor: "pointer",
                                        borderRadius: "12px",
                                        border: "3px solid black",
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

export default Slider;
