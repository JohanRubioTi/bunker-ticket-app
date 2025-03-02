import React from 'react';
import { Link } from 'react-router-dom';
import { Home, User, Bell, Ticket } from 'lucide-react';

const MobileNavbar: React.FC = () => {
  return (
    <nav className="mobile-navbar bg-gray-900 bg-opacity-75 border-t border-green-500 backdrop-blur-sm z-50 fixed bottom-0 w-full md:hidden"> {/* Visible on mobile, hidden on desktop */}
      <div className="container mx-auto py-3 flex justify-evenly items-center">
        <Link to="/" className="mobile-nav-link">
          <Home size={24} />
        </Link>
        <Link to="/tickets" className="mobile-nav-link">
          <Ticket size={24} />
        </Link>
        <Link to="/notifications" className="mobile-nav-link">
          <Bell size={24} />
        </Link>
        <Link to="/profile" className="mobile-nav-link">
          <User size={24} />
        </Link>
      </div>
    </nav>
  );
};

export default MobileNavbar;
