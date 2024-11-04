import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import QRCode from "qrcode";
import "./comprar.css";

const productos = [
  { id: 1, title: "Q'Lokura - 24 de Octubre", price: 9000, description: "Descripción del evento Q'Lokura.", pictures: [{ url: require("../img/1.jpg") }] },
  { id: 2, title: "Q'Lokura - 25 de Octubre", price: 9000, description: "Descripción del evento Q'Lokura.", pictures: [{ url: require("../img/2.jpg") }] },
  { id: 3, title: "Q'Lokura - 26 de Octubre", price: 9000, description: "Descripción del evento Q'Lokura.", pictures: [{ url: require("../img/1.jpg") }] },
];

const Comprar = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const producto = productos.find((prod) => prod.id === parseInt(id));

  const [cantidad, setCantidad] = useState(1);
  const [entradas, setEntradas] = useState([{ nombre: "", apellido: "", dni: "" }]); 
  const [qrValues, setQrValues] = useState([]); 
  const [compraRealizada, setCompraRealizada] = useState(false);

  if (!producto) {
    return <p>No se encontró el producto.</p>;
  }

  const { title, price, pictures } = producto;

  const handleSubmit = (e) => {
    e.preventDefault();

    const ticketInfoList = entradas.map((entrada, index) => {
      return `Compra de entrada #${index + 1} para ${title} - Nombre: ${entrada.nombre}, Apellido: ${entrada.apellido}, DNI: ${entrada.dni}`;
    });

    setQrValues(ticketInfoList); // Almacena los valores de los QR

    // Guardar en localStorage
    const compras = JSON.parse(localStorage.getItem('compras')) || [];
    ticketInfoList.forEach((ticketInfo, index) => {
      compras.push({
        title,
        cantidad: 1, // Cada entrada se cuenta por separado
        nombre: entradas[index].nombre,
        apellido: entradas[index].apellido,
        dni: entradas[index].dni,
        qrValue: ticketInfo, // Guarda el valor del QR para cada entrada
      });
    });
    localStorage.setItem('compras', JSON.stringify(compras));

    alert("Compra realizada con éxito!"); // Mensaje de éxito
    setCompraRealizada(true);
  };

  const downloadQRs = () => {
    qrValues.forEach((qrValue, index) => {
      const canvas = document.createElement('canvas');
      const link = document.createElement('a');

      QRCode.toCanvas(canvas, qrValue, { width: 256 }, (error) => {
        if (error) console.error(error);

        const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        link.href = pngUrl;
        link.download = `ticket_${index + 1}.png`; // Nombre del archivo para cada entrada
        link.click();
      });
    });
  };

  const handleChange = (index, field, value) => {
    const newEntradas = [...entradas];
    newEntradas[index][field] = value;
    setEntradas(newEntradas);
  };

  const handleCantidadChange = (e) => {
    const newCantidad = parseInt(e.target.value);
    setCantidad(newCantidad);
    
    // Asegurarse de que el estado de entradas tenga la misma cantidad de objetos
    const newEntradas = [];
    for (let i = 0; i < newCantidad; i++) {
      newEntradas.push(entradas[i] || { nombre: "", apellido: "", dni: "" });
    }
    setEntradas(newEntradas);
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

            <div className="mb-3">
              <label htmlFor="cantidad" className="form-label">
                Cantidad de Entradas
              </label>
              <input
                type="number"
                className="form-control w-50"
                id="cantidad"
                value={cantidad}
                onChange={handleCantidadChange}
                min="1"
              />
            </div>

            <form onSubmit={handleSubmit}>
              {entradas.map((entrada, index) => (
                <div key={index}>
                  <div className="mb-3">
                    <h5 className="fw-bold fs-4 pl">Entrada {index + 1}:</h5>
                    <label htmlFor={`nombre-${index}`} className="form-label">
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="form-control w-50"
                      id={`nombre-${index}`}
                      value={entrada.nombre}
                      onChange={(e) => handleChange(index, 'nombre', e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor={`apellido-${index}`} className="form-label">
                      Apellido
                    </label>
                    <input
                      type="text"
                      className="form-control w-50"
                      id={`apellido-${index}`}
                      value={entrada.apellido}
                      onChange={(e) => handleChange(index, 'apellido', e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor={`dni-${index}`} className="form-label">
                      DNI
                    </label>
                    <input
                      type="text"
                      className="form-control w-50"
                      id={`dni-${index}`}
                      value={entrada.dni}
                      onChange={(e) => handleChange(index, 'dni', e.target.value)}
                      required
                    />
                  </div>
                </div>
              ))}

              <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-secondary me-3" type="submit">
                  Finalizar Compra
                </button>
                {compraRealizada && ( 
                  <button className="btn btn-secondary" type="button" onClick={downloadQRs}>
                    Descargar Todos los QR
                  </button>
                  )}
              </div>
            </form>
          </div>
        </div>
      </div>

      <button className="btn btn-secondary my-3" onClick={() => navigate(-1)}>
        Volver
      </button>
    </div>
  );
};

export default Comprar;
