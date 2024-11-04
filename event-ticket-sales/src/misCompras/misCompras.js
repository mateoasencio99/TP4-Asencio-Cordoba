import React from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'qrcode';

const MisCompras = () => {
  const navigate = useNavigate();
  const compras = JSON.parse(localStorage.getItem('compras')) || []; // Obtener compras del localStorage

  const downloadQR = async (qrValue) => {
    try {
      const canvas = document.createElement('canvas');
      await QRCode.toCanvas(canvas, qrValue, { width: 256 });

      const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = "ticket.png"; // Nombre del archivo a descargar
      link.click();
    } catch (error) {
      console.error("Error generating QR code: ", error);
    }
  };

  return (
    <div className="container mt-4 py-5">
      <h2 className="text-center mb-4">Mis Compras</h2>
      {compras.length === 0 ? (
        <p className="text-center">No has realizado ninguna compra.</p>
      ) : (
        <ul className="list-group">
          {compras.map((compra, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h5>{compra.title}</h5>
                <p>Cantidad: {compra.cantidad}</p>
                <p>Nombre: {compra.nombre} {compra.apellido}</p>
                <p>DNI: {compra.dni}</p>
              </div>
              <div>
                <button className="btn btn-primary mt-2" onClick={() => downloadQR(compra.qrValue)}>
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
