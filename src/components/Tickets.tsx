import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Tickets: React.FC = () => {
  const [tickets, setTickets] = useState<{ id: number; event: string; date: string }[]>([]);

  useEffect(() => {
    // Fetch tickets from an API or local storage
    const fetchedTickets = [
      { id: 1, event: 'Noche Techno', date: '10/05/2024' },
      { id: 2, event: 'Fiesta House', date: '17/05/2024' },
    ];
    setTickets(fetchedTickets);
  }, []);

  return (
    <div className="container mx-auto p-4 full-screen-gradient min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Mis Boletos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tickets.map((ticket) => (
          <Link to={`/evento/${ticket.id}`} key={ticket.id} className="ticket-card flex items-center bg-black p-4 rounded-lg shadow-lg border border-green-500 hover:shadow-xl transition-transform transform hover:scale-105 duration-300 ease-in-out">
            <img src="https://via.placeholder.com/150x100" alt={ticket.event} className="w-24 h-24 object-cover rounded-lg mr-4" />
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">{ticket.event}</h3>
              <p className="text-gray-400">{ticket.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Tickets;
