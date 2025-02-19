import React, { useEffect, useRef, useState } from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from "axios";

const MediaSlider = () => {
    const [index, setIndex] = useState(0);
    const [autoslide, setAutoSlide] = useState(true);
    const [media, setMedia] = useState([]); // Default to empty array
    const CarouselRef = useRef();
    const [loading, setLoading] = useState(false)
    const [selectedLocation, setSelectedLocation] = useState("67a724c322158265248b1dd1");
   
    console.log(media)
    const handleSelect = (selectedIndex, manual = true) => {
        setIndex(selectedIndex);
        if (!manual) {
            setAutoSlide(false);
        }
    };

    useEffect(() => {
        if (CarouselRef.current) {
            CarouselRef.current.next();
        }
    }, [index]);
    const handleVideoEnd = (videos) => {
        const nextIndex = (index + 1) % videos.length;
        setIndex(nextIndex);
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const resp = await axios.get(`https://apiimmigin.singlemindinfo.com/api/countryVisa/country/${selectedLocation}`);
            const data = resp.data.country.sliderGallery;
            const formattedMedia = [
                ...(data.images || []).map((src, index) => ({ type: "image", src, alt: `Image ${index + 1}` })),
                ...(data.videos || []).map((src, index) => ({ type: "video", src, alt: `Video ${index + 1}` }))
            ];

            setMedia(formattedMedia);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);
    if (loading) {
        return <div>Loading....</div>
    }

    const thumbnail = {
        src: [
            'https://www.niti.gov.in/sites/default/files/2022-11/tourism.jpg',
            'https://www.niti.gov.in/sites/default/files/2022-11/tourism.jpg',
            'https://www.niti.gov.in/sites/default/files/2022-11/tourism.jpg'
            ]
    }

    return (
        <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            controls={false}
            indicators={false}
            fade
            pause={false}
            interval={autoslide ? 3000 : null}
            style={{ width: "100%", height: "500px", margin: "0 auto" }}
        >
            {media.length > 0 ? (
                media.map((mediaItem, i) => (
                    <Carousel.Item key={i}>
                        <div style={{ position: "relative", height: "500px", width: "100%", overflow: "hidden" }}>
                            {mediaItem.type === "video" ? (
                                <video
                                    className="d-block w-100"
                                    src={mediaItem.src}
                                    alt={mediaItem.alt}
                                    autoPlay
                                    muted
                                    playsInline
                                    onEnded={handleVideoEnd}
                                    loop
                                    style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(60%)" }}
                                />
                            ) : (
                                <img
                                    className="d-block w-100"
                                    src={mediaItem.src}
                                    alt={mediaItem.alt}
                                    style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(60%)" }}
                                />
                            )}
                        </div>

                        <div
                            style={{
                                position: "absolute",
                                bottom: "20px",
                                right: "20px",
                                display: "flex",
                                background: "black",
                                border: "2px solid black",
                                padding: "5px",
                                borderRadius: "15px",
                                boxShadow: "0px 4px 10px black",
                                gap: "5px",
                            }}
                        >
                            {thumbnail.src.map((thumb, thumbIndex) => (
                                <img
                                    key={thumbIndex}
                                    src={thumb}
                                    alt={"normal"}
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
                    </Carousel.Item>
                ))
            ) : (
                <p style={{ textAlign: "center", marginTop: "200px", color: "black" }}>Loading...</p>
            )}
        </Carousel>
    );
};

export default MediaSlider;
