import React, { useState, useEffect } from "react";
import "./carousel.css";

const Carousel = () => {
    const [images, setImages] = useState([]); 
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animationClass, setAnimationClass] = useState("slide-in");
    

    // Función para obtener las imágenes desde la API
    const fetchImages = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/upcomingEvents'); 
            if (!response.ok) {
                throw new Error('Error al obtener las imágenes');
            }
            const data = await response.json();
            console.log(data);
            const imageUrls = data.map(event => require(`../img/events/${event.id}.jpg`));
            setImages(imageUrls); 
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

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
