import React from 'react';
import { Link } from 'react-router-dom';

const TopNavbar: React.FC = () => {
  return (
    <nav className="top-navbar bg-black bg-opacity-75 border-b border-green-500 backdrop-blur-sm z-[500] hidden md:block"> {/* Hidden on mobile, visible on desktop */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="font-bold text-xl text-white">Bunker Bogotá</Link> {/* Brand */}
        <ul className="flex space-x-6">
          <li><Link to="/" className="top-nav-link">Inicio</Link></li>
          <li><Link to="/admin" className="top-nav-link">Admin</Link></li>
          <li><Link to="/tickets" className="top-nav-link">Mis Eventos</Link></li>
          <li><Link to="/notifications" className="top-nav-link">Notificaciones</Link></li>
          <li><Link to="/profile" className="top-nav-link">Perfil</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default TopNavbar;
