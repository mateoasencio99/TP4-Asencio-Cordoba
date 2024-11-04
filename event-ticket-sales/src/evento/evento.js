import React, { useEffect, useState } from 'react';
import "./evento.css";
import { Link } from "react-router-dom";


const Eventos = () => {

    const [eventos, setEventos] = useState([]);
    
    const fetchEventos = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/events');
            if (!response.ok) {
                throw new Error('Error al obtener las imágenes');
            }
            const data = await response.json();
            setEventos(data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
        }
    };
    
    useEffect(() => {
        fetchEventos();
    }, []);

    const formatFecha = (fecha) => {
        const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(fecha).toLocaleDateString('es-ES', opciones).replace(/\//g, '/'); // Cambia las barras si es necesario
    };

    return (
        <div className="container pb-5">
        <h2 className="text-center py-5">EVENTOS</h2>
        <div className="row">
            {eventos.map(evento => (
                <div className="col-md-4 mb-4" key={evento.id}>
                    <div className="card h-100 shadow bc bs">
                        <img
                            src={require(`../img/events/${evento.id}.jpg`)}
                            className="card-img-top event-image"
                            alt={`Imagen de ${evento.nombre}`}
                        />
                        <div className="card-body text-center">
                            <h5 className="card-title fs-4 fw-bold text-dark">{evento.name}</h5>
                            <p className="card-text fs-5 text-success">${evento.price}</p>
                            <p className="card-text text-muted">{formatFecha(evento.date)}</p>
                            <Link to={`/detalles/${evento.id}`} className="btn btn-dark fs-6 fw-bold boton">
                                Ver detalles
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    );
};

export default Eventos;
