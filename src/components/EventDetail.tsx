import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const eventos = {
  '1': { id: '1', nombre: 'Noche Techno', fecha: '10/05/2024', descripcion: 'Una noche de puro techno.', precio: 25, imageUrl: 'https://via.placeholder.com/600x400' },
  '2': { id: '2', nombre: 'Fiesta House', fecha: '17/05/2024', descripcion: 'Muévete al ritmo de la música house.', precio: 20, imageUrl: 'https://via.placeholder.com/600x400' },
  '3': { id: '3', nombre: 'Sesión Drum & Bass', fecha: '24/05/2024', descripcion: 'Siente la energía del drum & bass.', precio: 30, imageUrl: 'https://via.placeholder.com/600x400' },
};

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const evento = eventos[id as keyof typeof eventos];

  const [cantidad, setCantidad] = useState(1);
  const [procesandoPago, setProcesandoPago] = useState(false);

  if (!evento) {
    return <div className="container mx-auto p-4">Evento no encontrado.</div>;
  }

  const handleComprarBoletas = () => {
    setProcesandoPago(true);
    setTimeout(() => {
      setProcesandoPago(false);
      alert(`¡Compraste ${cantidad} boleta(s) para ${evento.nombre} exitosamente!`);
    }, 2000);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="card">
        <img src={evento.imageUrl} alt={evento.nombre} className="w-full h-96 object-cover" />
        <div className="card-content">
          <h1 className="card-title">{evento.nombre}</h1>
          <p className="card-date mb-4">{evento.fecha}</p>
          <p className="text-gray-300 mb-4">{evento.descripcion}</p>
          <p className="text-xl font-semibold text-green-400 mb-4">Precio: ${evento.precio}</p>

          <div className="mb-4">
            <label htmlFor="cantidad" className="block text-sm font-medium text-gray-300">Cantidad:</label>
            <input
              type="number"
              id="cantidad"
              min="1"
              value={cantidad}
              onChange={(e) => setCantidad(parseInt(e.target.value, 10))}
              className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 text-black"
            />
          </div>

          <button
            onClick={handleComprarBoletas}
            disabled={procesandoPago}
            className={`${procesandoPago ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-700'} text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            {procesandoPago ? 'Procesando...' : 'Comprar Boletas'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
