import React, { useState } from 'react';
    import { useParams } from 'react-router-dom';

    // Datos de eventos (simulados, reemplaza con la carga de datos real)
    const events = {
      '1': { id: '1', name: 'Noche Techno', date: '10/05/2024', description: 'Una noche de puro techno.', price: 25, imageUrl: 'https://via.placeholder.com/600x400' },
      '2': { id: '2', name: 'Fiesta House', date: '17/05/2024', description: 'Muévete al ritmo de la música house.', price: 20, imageUrl: 'https://via.placeholder.com/600x400' },
      '3': { id: '3', name: 'Sesión Drum & Bass', date: '24/05/2024', description: 'Siente la energía del drum & bass.', price: 30, imageUrl: 'https://via.placeholder.com/600x400' },
    };

    const EventDetail: React.FC = () => {
      const { id } = useParams<{ id: string }>();
      const event = events[id as keyof typeof events];

      const [quantity, setQuantity] = useState(1);
      const [paymentProcessing, setPaymentProcessing] = useState(false);

      if (!event) {
        return <div className="container mx-auto p-4">Evento no encontrado.</div>;
      }

      const handleBuyTickets = () => {
        setPaymentProcessing(true);
        // Simula el procesamiento del pago (reemplaza con la integración real del pago)
        setTimeout(() => {
          setPaymentProcessing(false);
          alert(`¡Compraste ${quantity} boleta(s) para ${event.name} exitosamente!`);
        }, 2000); // Simula un retraso de 2 segundos
      };

      return (
        <div className="container mx-auto p-4">
          <div className="card">
            <img src={event.imageUrl} alt={event.name} className="w-full h-96 object-cover" />
            <div className="card-content">
              <h1 className="card-title">{event.name}</h1>
              <p className="card-date mb-4">{event.date}</p>
              <p className="text-gray-300 mb-4">{event.description}</p>
              <p className="text-xl font-semibold text-green-400 mb-4">Precio: ${event.price}</p>

              <div className="mb-4">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-300">Cantidad:</label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                  className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 text-black"
                />
              </div>

              <button
                onClick={handleBuyTickets}
                disabled={paymentProcessing}
                className={`${paymentProcessing ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-700'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              >
                {paymentProcessing ? 'Procesando...' : 'Comprar Boletas'}
              </button>
            </div>
          </div>
        </div>
      );
    };

    export default EventDetail;
