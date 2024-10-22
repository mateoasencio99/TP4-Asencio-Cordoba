import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNombre = async () => {
      try {
        const response = await fetch('http://localhost:3001/configurations');
        if (!response.ok) {
          throw new Error('Error al obtener el nombre');
        }
        const data = await response.json();
        setNombre(data.nombre); // Asegúrate que 'nombre' esté en la respuesta
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNombre();
  }, []);

  return (
    <header>
      <h1>Mi Aplicación</h1>
      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}
      <nav>
        <ul>
          
        </ul>
      </nav>
      {nombre && <p>Hola, {nombre}!</p>} {/* Muestra el nombre si está disponible */}
    </header>
  );
};

export default Nav;
