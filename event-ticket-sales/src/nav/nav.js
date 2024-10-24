import React/*, { useEffect, useState }*/ from 'react';

const Nav = () => {
  // const [nombre, setNombre] = useState('');
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchNombre = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8080/api/configurations');
  //       if (!response.ok) {
  //         throw new Error('Error al obtener el nombre');
  //       }
  //       const data = await response.json();
  //       setNombre(data.nombre); // Asegúrate que 'nombre' esté en la respuesta
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchNombre();
  // }, []);

  // if (loading) return <div>Cargando...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <div className='text-center'>
      {/* <h2>Mi aplicación: {nombre}</h2> */}


      <nav>
          <div>
          <a href='/'>Inicio</a>
          <a href='/'>Eventos</a>
          <a href='/'>Mis Compras</a>
          
          </div>
          <a href='/'>Ingresar/Registrarse</a>
      </nav>
       
    </div>
    
  );
};

export default Nav;