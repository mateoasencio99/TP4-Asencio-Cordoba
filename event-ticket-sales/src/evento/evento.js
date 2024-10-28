import React from "react";
import "./evento.css";
import { Link } from "react-router-dom";

const eventos = [
    { id: 1, nombre: "Q'Lokura - 24 de Octubre", precio: 9000, imagen: require("../img/1.jpg") },
    { id: 2, nombre: "Q'Lokura - 25 de Octubre", precio: 9000, imagen: require("../img/2.jpg") },
    { id: 3, nombre: "Q'Lokura - 26 de Octubre", precio: 9000, imagen: require("../img/1.jpg") },
];

const Eventos = () => {
    return (
        <div>
            <h1>Eventos</h1>
            <div className="container">
                <h2 className="text-center py-5">Eventos</h2>
                <div className="row">
                    {eventos.map(evento => (
                        <div className="col-md-4" key={evento.id}>
                            <img
                                src={evento.imagen}
                                className="d-block w-100"
                                alt={`Imagen de ${evento.nombre}`}
                            />
                            <Link to={`/detalles/${evento.id}`}>{evento.nombre}</Link>
                            <p>${evento.precio}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Eventos;
