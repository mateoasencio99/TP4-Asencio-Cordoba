import React, { useState } from "react";
import { Link } from "react-router-dom"; // Solo necesitas Link ahora
import 'bootstrap/dist/css/bootstrap.min.css';
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías manejar la lógica de inicio de sesión, como la validación de credenciales.
    console.log("Iniciar sesión con:", { email, password });
  };

  return (
    <div className="container mt-4 py-5">
      <div className="row bg-light p-4 rounded align-items-center">
        <div className="col-md-6 d-flex justify-content-center">
          <img
            className="login-imagen img-fluid max-height-400 mb-4"
            src={require("../img/1.jpg")} // Cambia la imagen según necesites.
            alt="Login"
          />
        </div>
        
        <div className="col-md-6">
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo Electrónico</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Iniciar Sesión
            </button>
          </form>
          <div className="text-center mt-3">
            <p>
              ¿No estás registrado? <Link to="/registro">Regístrate aquí</Link> {/* Cambiado a Link */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
