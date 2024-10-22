import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNombre = async () => {
      try {
        const response = await fetch('https://localhost:3000/nombre');
        if (!response.ok) {
          throw new Error('Error al obtener el nombre');
        }
        const data = await response.json();
        setNombre(data.nombre); // Asumiendo que el nombre viene en un objeto con la propiedad 'nombre'
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNombre();
  }, []);
  return (
    <header style={headerStyle}>
      <h1>Mi Aplicación</h1>
      <nav>
        <ul style={navStyle}>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/about"></Link></li>
          <li><Link to="/contact">Mis Compras</Link></li>
        </ul>
      </nav>
    </header>
  );
};


export default Nav;


