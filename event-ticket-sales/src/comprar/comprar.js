import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import QRCode from "qrcode";
import "./comprar.css";

const Comprar = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cantidad, setCantidad] = useState(1);
  const [entradas, setEntradas] = useState([{ nombre: "", apellido: "", dni: "" }]); 
  const [qrValues, setQrValues] = useState([]); 
  const [event, setEvent] = useState([]); 
  const [compraRealizada, setCompraRealizada] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/verify-token", {
          headers: {
            Authorization: token, 
          },
        });
        if (!response.ok) {
          throw new Error("Token invalid or expired");
        }
      } catch (error) {
        console.error(error);
        localStorage.removeItem("token"); 
        navigate("/login");
      }
    };

    verifyToken();
  }, [navigate]);
    const fetchEvento = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/events/${id}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener las imágenes");
        }
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
      }
    };

    useEffect(() => {
      fetchEvento();
    }, []);

      if (!event) {
        return <p>No se encontró el evento.</p>;
      }

      const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
          const token = localStorage.getItem("token");
          const response = await fetch('http://localhost:8080/api/tickets', {
              method: 'POST', // Specify POST method
              headers: {
                  'Content-Type': 'application/json', // Set JSON content type
                  'Authorization': `Bearer ${token}`, // Agrega el token aquí
              },
              body: JSON.stringify({ 
                tickets: entradas, 
                eventId: event.id
            }),
          });
  
          if (!response.ok) {
              throw new Error('Error al crear el evento');
          }else{
            window.location.href = '/mis-compras'
          }
  
          
          // Optionally, update your state or redirect after successful creation
      } catch (error) {
          console.error('Error:', error);
      }

        alert("Compra realizada con éxito!"); // Mensaje de éxito
        setCompraRealizada(true);
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
        {event?.id ? (
          <img
            className="producto-imagen img-fluid max-height-400"
            src={require(`../img/events/${event.id}.jpg`)}
            alt={event.name}
          />
        ) : (
          <p>Cargando imagen...</p>
        )}
        <p className="mt-3">{event.description}</p>
        </div>
        <div className="col-md-8 ms-md-4">
          <h2 className="text-center mb-4">{event.name}</h2>
          <div className="detalles mb-4">
            <p className="h5">Precio: ${event.price}</p>

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
