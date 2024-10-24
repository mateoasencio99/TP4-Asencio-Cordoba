import React, { useState, useEffect } from "react";
import "./carousel.css";

const Carousel = () => {
    console.log("Carousel se está renderizando");
    const images = [
        require('../img/1.jpg'),
        require('../img/2.jpg'),
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [animationClass, setAnimationClass] = useState("slide-in");

    useEffect(() => {
        const intervalId = setInterval(() => {
            setAnimationClass("slide-out");
            setTimeout(() => {
                setCurrentIndex((prevIndex) =>
                    prevIndex === images.length - 1 ? 0 : prevIndex + 1
                );
                setAnimationClass("slide-in"); 
            }, 1000); 
        }, 3000);

        return () => clearInterval(intervalId); 
    }, [images.length]);

    return (
        <div className="carousel-container">
            <img
                src={images[currentIndex]}
                className={`carousel-image ${animationClass}`}
                alt={`Imagen ${currentIndex + 1}`}
            />
        </div>
    );
};

export default Carousel;
