import React, { useEffect, useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'qrcode';

const MisCompras = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
    
  const fetchEventos = async () => {
      try {
          const token = localStorage.getItem("token");
          const response = await fetch('http://localhost:8080/api/userTickets', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
          
        });
          if (!response.ok) {
              throw new Error('Error al obtener las imágenes');
          }
          const data = await response.json();
          setTickets(data);
      } catch (error) {
          console.error('Error:', error);
      } finally {
      }
  };
  
  useEffect(() => {
      fetchEventos();
  }, []);




  const downloadQR = async (compra) => {
    try {
      const canvas = document.createElement('canvas');
      await QRCode.toCanvas(canvas,  `Compra de entrada #${compra.id} para ${compra.event.name} - Nombre: ${compra.name}, Apellido: ${compra.lastName}, DNI: ${compra.dni}`, { width: 256 });

      const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = "ticket.png";
      link.click();
    } catch (error) {
      console.error("Error generating QR code: ", error);
    }
  };

  return (
    <div className="container mt-4 py-5">
      <h2 className="text-center mb-4">Mis Compras</h2>
      {tickets.length === 0 ? (
        <p className="text-center">No has realizado ninguna compra.</p>
      ) : (
        <ul className="list-group">
          {tickets.map((compra, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h5>{compra.event.name}</h5>
                <p>Nombre: {compra.name} {compra.lastName}</p>
                <p>DNI: {compra.dni}</p>
              </div>
              <div>
                <button className="btn btn-primary mt-2" onClick={() => downloadQR(compra)}>
                  Descargar QR
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button className="btn btn-secondary mt-4" onClick={() => navigate(-1)}>
        Volver
      </button>
    </div>
  );
};

export default MisCompras;
