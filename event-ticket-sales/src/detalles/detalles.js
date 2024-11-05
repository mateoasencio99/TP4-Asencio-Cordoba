import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./detalles.css";

const Detalles = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [event, setEvent] = useState([]);
    
    const fetchEvento = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/events/${id}`);
            if (!response.ok) {
                throw new Error('Error al obtener las imágenes');
            }
            const data = await response.json();
            console.log(data)
            setEvent(data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
        }
    };
    
    useEffect(() => {
      fetchEvento();
    }, []);


  if (!event) {
    return <p>No se encontró el evento.</p>;
  }

  const { name, price, description, location } = event;

  return (
    <div className="container mt-4 py-5">
      <div className="row bg-light p-4 rounded align-items-center">
        <div className="col-md-6 d-flex justify-content-center">
          <img
            className="producto-imagen img-fluid max-height-400 mb-4"
            src={require(`../img/events/${id}.jpg`)}
            alt={name}
          />
        </div>
        
        <div className="col-md-6">
          <h2 className="text-center mb-4">{name}</h2>
          <p className="h5 text-center">Precio: ${price}</p>
          <p className="h5 text-center">Localidad: {location?.name}</p>
          <p className="text-center">{description}</p>
        </div>
      </div>
      
      <div className="d-flex justify-content-center my-3 ">
        <button className="btn btn-secondary me-3" onClick={() => navigate(`/comprar/${id}`)}>
          Comprar
        </button>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>
    </div>
  );
};

export default Detalles;
