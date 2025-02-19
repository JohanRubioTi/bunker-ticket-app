import React from 'react';
import { useParams, Link } from 'react-router-dom';

const eventos = [
  { id: '1', nombre: 'Noche Techno', fecha: '10/05/2024', imageUrl: 'https://via.placeholder.com/300x200', genreId: '1' },
  { id: '2', nombre: 'Fiesta House', fecha: '17/05/2024', imageUrl: 'https://via.placeholder.com/300x200', genreId: '2' },
  { id: '3', nombre: 'Sesión Drum & Bass', fecha: '24/05/2024', imageUrl: 'https://via.placeholder.com/300x200', genreId: '3' },
  { id: '4', nombre: 'Underground Beats', fecha: '31/05/2024', imageUrl: 'https://via.placeholder.com/300x200', genreId: '1' },
];

const generos = [
    { id: '1', nombre: 'Techno', imageUrl: 'https://via.placeholder.com/150x100' },
    { id: '2', nombre: 'House', imageUrl: 'https://via.placeholder.com/150x100' },
    { id: '3', nombre: 'Drum & Bass', imageUrl: 'https://via.placeholder.com/150x100' },
];

const GenreEvents: React.FC = () => {
  const { genreId } = useParams<{ genreId: string }>();
  const genero = generos.find(g => g.id === genreId);
  const eventosFiltrados = eventos.filter((evento) => evento.genreId === genreId);

  if (!genero) {
    return <div className="container mx-auto p-4">Género no encontrado.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Eventos: {genero.nombre}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {eventosFiltrados.map((evento) => (
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

export default GenreEvents;
