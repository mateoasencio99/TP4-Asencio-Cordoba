import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSalesContext } from "../salesContext/salesContext";

const Nav = () => {
  const navigate = useNavigate();
  const [configurations, setConfigurations] = useState([]);
  const {  setCurrentEventId, currentEventId, setCurrentTickets } = useSalesContext();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/configurations"
        );
        if (!response.ok) {
          throw new Error("Error al obtener los eventos");
        }
        const data = await response.json();
        setConfigurations(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchEvents();
  }, []);

  const token = localStorage.getItem('token');
  const logout = () => {
    setCurrentEventId(0);
    setCurrentTickets([{ nombre: "", apellido: "", dni: "" }]);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="container">
        <Link className="navbar-brand text-white fs-4 fw-bold" to="/">{configurations.name}</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto ">
          <li className="nav-item">
              <Link className="nav-link text-white" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/eventos">Eventos</Link>
            </li>
            {token && (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/mis-compras">Mis Compras</Link>
              </li>
            )}
            {token && currentEventId > 0 && (
              <li className="nav-item">
                <Link className="nav-link text-white" to={`/comprar/${currentEventId}`}>Continuar compra</Link>
              </li>
            )}
            {token ? (
              <li className="nav-item">
                <button className="nav-link btn btn-link text-white" onClick={logout}>Logout</button>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/login">Ingresar/Registrarse</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
