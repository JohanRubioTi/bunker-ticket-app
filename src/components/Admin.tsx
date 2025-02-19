import React, { useState } from 'react';

const Admin: React.FC = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventPrice, setEventPrice] = useState('');
    const [eventImageUrl, setEventImageUrl] = useState('');
  const [events, setEvents] = useState<any[]>([]); // Reemplaza 'any' con un tipo de evento adecuado

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent = {
      id: Date.now().toString(), // ID único simple
      name: eventName,
      date: eventDate,
      description: eventDescription,
      price: parseFloat(eventPrice),
        imageUrl: eventImageUrl
    };
    setEvents([...events, newEvent]);
    // Restablecer el formulario
    setEventName('');
    setEventDate('');
    setEventDescription('');
    setEventPrice('');
    setEventImageUrl('');

    // En una aplicación real, enviarías estos datos a tu API backend
    console.log('Nuevo evento creado:', newEvent);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Panel de Administración</h1>

      <h2 className="text-2xl font-semibold mb-2">Crear Nuevo Evento</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label htmlFor="eventName" className="block text-sm font-medium text-gray-300">Nombre del Evento:</label>
          <input
            type="text"
            id="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="eventDate" className="block text-sm font-medium text-gray-300">Fecha del Evento:</label>
          <input
            type="date"
            id="eventDate"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="eventDescription" className="block text-sm font-medium text-gray-300">Descripción del Evento:</label>
          <textarea
            id="eventDescription"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="eventPrice" className="block text-sm font-medium text-gray-300">Precio del Evento:</label>
          <input
            type="number"
            id="eventPrice"
            value={eventPrice}
            onChange={(e) => setEventPrice(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="eventImageUrl" className="block text-sm font-medium text-gray-300">URL de la Imagen del Evento:</label>
          <input
            type="url"
            id="eventImageUrl"
            value={eventImageUrl}
            onChange={(e) => setEventImageUrl(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 text-black"
            required
          />
        </div>
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Crear Evento
        </button>
      </form>

      <h2 className="text-2xl font-semibold mb-2">Administrar Eventos</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id} className="mb-2">
            {event.name} - {event.date} - ${event.price}
            {/* Agrega botones de editar/eliminar aquí */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
