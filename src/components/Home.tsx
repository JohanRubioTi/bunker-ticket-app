import React from 'react';
import { Link } from 'react-router-dom';
import HeroBanner from './HeroBanner';
import { Dice1, MessageCircle } from 'lucide-react';

const eventosDestacados = [
  { id: '1', nombre: 'Noche Techno', fecha: '10/05/2024', imageUrl: 'https://via.placeholder.com/300x200', genreId: '1' },
  { id: '2', nombre: 'Fiesta House', fecha: '17/05/2024', imageUrl: 'https://via.placeholder.com/300x200', genreId: '2' },
];

const todosLosEventos = [
    ...eventosDestacados,
  { id: '3', nombre: 'Sesión Drum & Bass', fecha: '24/05/2024', imageUrl: 'https://via.placeholder.com/300x200', genreId: '3' },
  { id: '4', nombre: 'Underground Beats', fecha: '31/05/2024', imageUrl: 'https://via.placeholder.com/300x200', genreId: '1' },
  { id: '5', nombre: 'Electro Night', fecha: '07/06/2024', imageUrl: 'https://via.placeholder.com/300x200', genreId: '2' },
];

const generos = [
    { id: '1', nombre: 'Techno', imageUrl: 'https://via.placeholder.com/150x100' },
    { id: '2', nombre: 'House', imageUrl: 'https://via.placeholder.com/150x100' },
    { id: '3', nombre: 'Drum & Bass', imageUrl: 'https://via.placeholder.com/150x100' },
];

const Home: React.FC = () => {
  return (
    <div className="relative"> {/* Added relative positioning */}
      <HeroBanner />
      <div className="container mx-auto p-4 relative z-10"> {/* Added z-index */}
        <h2 className="text-3xl font-bold mb-6 text-center">Eventos Destacados</h2>
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

        <h2 className="text-3xl font-bold mt-12 mb-6 text-center">Explorar Géneros</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {generos.map((genero) => (
            <Link to={`/genero/${genero.id}`} key={genero.id} className="genre-card">
              <img src={genero.imageUrl} alt={genero.nombre} className="w-full h-32 object-cover rounded-lg" />
              <div className="mt-2 text-center text-white font-semibold">
                {genero.nombre}
              </div>
            </Link>
          ))}
        </div>

        <h2 className="text-3xl font-bold mt-12 mb-6 text-center" id="all-events">Todos Los Eventos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {todosLosEventos.map((evento) => (
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
    </div>
  );
};

export default Home;
