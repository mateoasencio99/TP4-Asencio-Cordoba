import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className='text-center'>
      <nav>
        <div>
          <Link to="/">Inicio</Link>
          <Link to="/eventos">Eventos</Link> {/* Cambiado a Link */}
          <Link to="/mis-compras">Mis Compras</Link> {/* Cambia según la ruta que necesites */}
        </div>
        <Link to="/login">Ingresar/Registrarse</Link> {/* Cambiado a /login */}
      </nav>
    </div>
  );
};

export default Nav;
