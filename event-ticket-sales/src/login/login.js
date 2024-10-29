import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate para redireccionar
import 'bootstrap/dist/css/bootstrap.min.css';
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Estado para el manejo de errores
  const navigate = useNavigate(); // Hook de navegación para redireccionar

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Resetea cualquier mensaje de error anterior

    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Guardar el token en localStorage y redirigir al usuario a la página principal
        localStorage.setItem('token', data.token);
        navigate('/'); // Redirige al usuario a la página de inicio
      } else {
        setError(data.error || 'Error de autenticación');
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Hubo un problema al iniciar sesión. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="container mt-4 py-5">
      <div className="row bg-light p-4 rounded align-items-center">
        <div className="col-md-6 d-flex justify-content-center">
          <img
            className="login-imagen img-fluid max-height-400 mb-4"
            src={require("../img/1.jpg")}
            alt="Login"
          />
        </div>
        
        <div className="col-md-6">
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          {error && <p className="text-danger text-center">{error}</p>}
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
              ¿No estás registrado? <Link to="/registro">Regístrate aquí</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
