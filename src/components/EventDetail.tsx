import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import QuantitySelector from './QuantitySelector';

interface Evento {
  id: string;
  nombre: string;
  fecha: string;
  descripcion: string;
  precio: number;
  imageUrl: string;
  ticketOptions?: { type: string; price: number }[];
}

interface Eventos {
  [key: string]: Evento;
}


const eventosDestacados = [
    { id: '1', nombre: 'Noche Techno', fecha: '10/05/2024', imageUrl: 'https://via.placeholder.com/300x200', genreId: '1' },
    { id: '2', nombre: 'Fiesta House', fecha: '17/05/2024', imageUrl: 'https://via.placeholder.com/300x200', genreId: '2' },
  ];

const eventos: Eventos = {
  '1': { id: '1', nombre: 'Noche Techno', fecha: '10/05/2024', descripcion: 'Una noche de puro techno.', precio: 25, imageUrl: 'https://via.placeholder.com/600x400', ticketOptions: [{type: 'General', price: 25}, {type: 'VIP', price: 50}] },
  '2': { id: '2', nombre: 'Fiesta House', fecha: '17/05/2024', descripcion: 'Muévete al ritmo de la música house.', precio: 20, imageUrl: 'https://via.placeholder.com/600x400' },
  '3': { id: '3', nombre: 'Sesión Drum & Bass', fecha: '24/05/2024', descripcion: 'Siente la energía del drum & bass.', precio: 30, imageUrl: 'https://via.placeholder.com/600x400', ticketOptions: [{type: 'Platinum', price: 45}] },
};

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const evento = eventos[id as keyof Eventos];

   useEffect(() => {
     window.scrollTo(0, 0);
   }, [id]);

  const [procesandoPago, setProcesandoPago] = useState(false);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>(
    evento?.ticketOptions?.reduce(
      (acc: { [key: string]: number }, option: { type: string; price: number }) => {
        acc[option.type] = 0;
        return acc;
      },
      {}
    ) || {}
  );

    console.log("Rendering EventDetail with id:", id);

  if (!evento) {
    return <div className="container mx-auto p-4">Evento no encontrado.</div>;
  }

  const handleComprarBoletas = () => {
    setProcesandoPago(true);
    setTimeout(() => {
      setProcesandoPago(false);
      const purchaseSummary = Object.entries(quantities)
        .filter(([_, quantity]) => quantity > 0)
        .map(([type, quantity]) => `${quantity} ${type}`)
        .join(', ');
      alert(`¡Compraste ${purchaseSummary} para ${evento.nombre} exitosamente!`);
    }, 2000);
  };

  const recomendaciones: string[] = [
    'Llega temprano para evitar filas.',
    'Trae tu identificación oficial.',
    'Disfruta de la mejor música!',
  ];

 return (
    <div className="container mx-auto p-4">
      <div className="md:grid md:grid-cols-2 md:gap-8 max-w-4xl mx-auto bg-black rounded-lg shadow-lg overflow-hidden border border-green-500 md:rounded-none">
        <div className="md:flex md:items-center">
            <img src={evento.imageUrl} alt={evento.nombre} className="w-full object-contain rounded-t-lg md:rounded-l-lg md:rounded-t-none" />
        </div>
        <div className="p-4">
            <h1 className="text-xl font-semibold text-white mb-2">{evento.nombre}</h1>
            <p className="text-white mb-4">{evento.fecha}</p>
            <p className="text-gray-300 mb-4">{evento.descripcion}</p>
                {evento?.ticketOptions ? (
                    <div>
                        {evento.ticketOptions.map((option: {type: string, price: number}) => (
                        <div key={option.type} className="mb-4">
                            <label className="block text-sm font-medium text-gray-300">
                            {option.type} - ${option.price}:
                            </label>
                            <div className="w-40 border border-green-500 rounded-md">
                              <QuantitySelector
                              value={quantities[option.type] || 0}
                              onChange={(value) =>
                                  setQuantities((prevQuantities) => ({
                                  ...prevQuantities,
                                  [option.type]: value,
                                  }))
                              }
                              />
                            </div>
                        </div>
                        ))}
                    </div>
                ) : (
                <p className="text-xl font-semibold text-green-400 mb-4">Precio: ${evento.precio}</p>
                )}
            <div className="mb-4">
                <h2 className="text-lg font-semibold text-white">Recomendaciones</h2>
                <ul className="recommendations-list list-none pl-4">
                {recomendaciones.map((item: string, index: number) => (
                    <li key={index} className="text-gray-300">{item}</li>
                ))}
                </ul>
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
          <Link to={`/evento/${evento.id}`} key={evento.id} className="event-card">
            <img src={evento.imageUrl} alt={evento.nombre} className="w-full h-56 object-cover rounded-t-lg" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-white mb-2">{evento.nombre}</h3>
              <p className="text-gray-400 mb-4">{evento.fecha}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EventDetail;
