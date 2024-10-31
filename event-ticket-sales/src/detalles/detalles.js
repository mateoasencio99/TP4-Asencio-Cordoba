import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./detalles.css";

const productos = [
  { id: 1, title: "Q'Lokura - 24 de Octubre", price: 9000, description: "Descripción del evento Q'Lokura.", pictures: [{ url: require("../img/1.jpg") }] },
  { id: 2, title: "Q'Lokura - 25 de Octubre", price: 9000, description: "Descripción del evento Q'Lokura.", pictures: [{ url: require("../img/2.jpg") }] },
  { id: 3, title: "Q'Lokura - 26 de Octubre", price: 9000, description: "Descripción del evento Q'Lokura.", pictures: [{ url: require("../img/1.jpg") }] },
];

const Detalles = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const producto = productos.find(prod => prod.id === parseInt(id)); 

  if (!producto) {
    return <p>No se encontró el producto.</p>;
  }

  const { title, price, description, pictures } = producto;

  return (
    <div className="container mt-4 py-5">
      <div className="row bg-light p-4 rounded align-items-center">
        <div className="col-md-6 d-flex justify-content-center">
          <img
            className="producto-imagen img-fluid max-height-400 mb-4"
            src={pictures[0].url}
            alt={title}
          />
        </div>
        
        <div className="col-md-6">
          <h2 className="text-center mb-4">{title}</h2>
          <p className="h5 text-center">Precio: ${price}</p>
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
