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
  const characterLimit = 100;

  return (
    <div className="container mt-4 py-5">
      <div className="bg-light p-4 rounded d-flex flex-column flex-md-row">
        <div className="col-md-4 mb-4 mb-md-0">
          <img
            className="producto-imagen img-fluid max-height-400"
            src={pictures[0].url}
            alt={title}
          />
        </div>
        <div className="col-md-8 ms-md-4">
          <h2 className="text-center mb-4">{title}</h2>
          <div className="detalles mb-4">
            <p className="h5">Precio: ${price}</p>
            <p>
              Descripción:{" "}
              {description.length > characterLimit ? description.slice(0, characterLimit) + "..." : description}
            </p>
          </div>

          <div className="d-flex justify-content-end me-5">
            <button className="btn btn-secondary text-end" onClick={() => navigate(-1)}>
              Finalizar Compra
            </button>
          </div>
          
        </div>
      </div>

      <button className="btn btn-secondary" onClick={() => navigate(-1)}>
        Volver
      </button>
    </div>
  );
};

export default Detalles;
