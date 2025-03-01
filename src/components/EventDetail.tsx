import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const eventosDestacados = [
    { id: '1', nombre: 'Noche Techno', fecha: '10/05/2024', imageUrl: 'https://via.placeholder.com/300x200', genreId: '1' },
    { id: '2', nombre: 'Fiesta House', fecha: '17/05/2024', imageUrl: 'https://via.placeholder.com/300x200', genreId: '2' },
  ];

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
      <div className="event-card transition-all duration-200 hover:shadow-lg">
        <img src={evento.imageUrl} alt={evento.nombre} className="w-full h-56 object-cover rounded-t-lg" />
        <div className="p-4 hover:bg-gray-800">
          <h1 className="text-xl font-semibold text-white mb-2 hover:text-gray-100">{evento.nombre}</h1>
          <p className="text-gray-400 mb-4">{evento.fecha}</p>
          <p className="text-gray-300 mb-4">{evento.descripcion}</p>
          <p className="text-xl font-semibold text-green-400 mb-4">Precio: ${evento.precio}</p>

          <div className="mb-4">
            <label htmlFor="cantidad" className="block text-sm font-medium text-gray-300 text-gray-300">Cantidad:</label>
            <input
              type="number"
              id="cantidad"
              min="1"
              value={cantidad}
              onChange={(e) => setCantidad(parseInt(e.target.value, 10))}
              className="mt-1 block w-20 rounded-md border-green-500 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 bg-transparent text-green-500"
            />
          </div>

          <button
            onClick={handleComprarBoletas}
            disabled={procesandoPago}
            className={`${procesandoPago ? 'bg-gray-500' : 'bg-transparent hover:bg-green-500'} border-2 border-green-500 text-green-500 hover:text-white font-bold py-2 px-4 rounded-full text-center transition duration-300 focus:outline-none focus:shadow-outline`}
          >
            {procesandoPago ? 'Procesando...' : 'Comprar Boletas'}
          </button>
        </div>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6 text-center">Eventos Relacionados</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {eventosDestacados.map((evento) => (
          <div key={evento.id} className="event-card">
            <img src={evento.imageUrl} alt={evento.nombre} className="w-full h-56 object-cover rounded-t-lg" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-white mb-2">{evento.nombre}</h3>
              <p className="text-gray-400 mb-4">{evento.fecha}</p>
              <Link to={`/evento/${evento.id}`} className="block bg-green-500 hover:bg-green-700 text-black font-bold py-2 px-4 rounded-full text-center transition duration-300">
                Ver Boletas
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventDetail;
