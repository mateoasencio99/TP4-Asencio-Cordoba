import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./comprar.css";

const productos = [
  { id: 1, title: "Q'Lokura - 24 de Octubre", price: 9000, description: "Descripción del evento Q'Lokura.", pictures: [{ url: require("../img/1.jpg") }] },
  { id: 2, title: "Q'Lokura - 25 de Octubre", price: 9000, description: "Descripción del evento Q'Lokura.", pictures: [{ url: require("../img/2.jpg") }] },
  { id: 3, title: "Q'Lokura - 26 de Octubre", price: 9000, description: "Descripción del evento Q'Lokura.", pictures: [{ url: require("../img/1.jpg") }] },
];

const Comprar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const producto = productos.find(prod => prod.id === parseInt(id));

  // Definir los hooks antes de cualquier retorno
  const [cantidad, setCantidad] = useState(1);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");

  if (!producto) {
    return <p>No se encontró el producto.</p>;
  }

  const { title, price, pictures } = producto;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías manejar la lógica para procesar la compra
    console.log({ cantidad, nombre, apellido, dni });
    alert("Compra realizada con éxito!");
  };

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

            {/* Campo para la cantidad de entradas */}
            <div className="mb-3">
              <label htmlFor="cantidad" className="form-label">Cantidad de Entradas</label>
              <input
                type="number"
                className="form-control w-50"
                id="cantidad"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                min="1"
              />
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control w-50"
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="apellido" className="form-label">Apellido</label>
                <input
                  type="text"
                  className="form-control w-50"
                  id="apellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="dni" className="form-label">DNI</label>
                <input
                  type="text"
                  className="form-control w-50"
                  id="dni"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  required
                />
              </div>
              
              <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-secondary me-3" type="submit">
                  Finalizar Compra
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
        Volver
      </button>
    </div>
  );
};

export default Comprar;
