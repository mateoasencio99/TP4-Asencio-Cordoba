import React, { useEffect, useState } from 'react';
import Carousel from "../carousel/carousel";
import './principal.css';

const Principal = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/upcomingEvents'); 
        if (!response.ok) {
          throw new Error('Error al obtener los eventos');
        }
        const data = await response.json();
        setEvents(data); 
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchEvents();
  }, []); 

  return (
    <div>
      <div className="container">
        <h2 className="text-center">Anuncios</h2>
        <Carousel />
      </div>{/* Fin de la seccion del Carousel*/}


      <div className="container">
        <h2 className="text-center">Proximos Eventos</h2>

        <div className="row">
        {events.map(event => (
        <div className="col-md-4">
          <img
            src={require(`../img/events/${event.id}.jpg`)}
            className="card-img"
            alt="Imagen Evento"
          />
          <p><a href="#detalles">{`${event.name} - ${new Date(event.date).toLocaleDateString()}`}</a></p>
          <p>{`$${event.price}`}</p>
        </div>
      ))}
        </div>
      </div>  {/* Fin de la seccion de los Proximos Eventos*/}



      <div className="container">
        <h2 className="text-center">Sobre Nosotros</h2>
        <div className="row">
          <div className="col-md-6">
            <img
              src={require("../img/2.jpg")}
              className="d-block w-100"
              alt="Imagen Organizador"
            />
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <p>
              Lorem Ipsum es simplemente el texto de relleno de las imprentas y
              archivos de texto. Lorem Ipsum ha sido el texto de relleno
              estándar de las industrias desde el año 1500, cuando un impresor
              (N. del T. persona que se dedica a la imprenta) desconocido usó
              una galería de textos y los mezcló de tal manera que logró hacer
              un libro de textos especimen. No sólo sobrevivió 500 años, sino
              que también ingresó como texto de relleno en documentos
              electrónicos, quedando esencialmente igual al original. Fue
              popularizado en los 60s con la creación de las hojas "Letraset",
              las cuales contenían pasajes de Lorem Ipsum, y más recientemente
              con software de autoedición, como por ejemplo Aldus PageMaker, el
              cual incluye versiones de Lorem Ipsum.
            </p>
          </div>
        </div>
      </div>{/* Fin de la seccion sobre nosotros*/}
    </div>
  );
};

export default Principal;
