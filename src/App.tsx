import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import EventDetail from './components/EventDetail';
import Admin from './components/Admin';
import Roulette from './components/Roulette';
import Payments from './components/Payments';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="p-4 bg-gray-800 relative">
        {/* Hamburger Menu Icon */}
        <button onClick={toggleMenu} className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        {/* Mobile and Desktop Menu (combined) */}
        <ul className={`${isMenuOpen ? 'block' : 'hidden'} md:flex md:static top-full left-0 w-full bg-gray-800 md:w-auto md:space-x-4`}>
          <li><Link to="/" className="block md:inline-block px-4 py-2 hover:text-green-500" onClick={() => setIsMenuOpen(false)}>Inicio</Link></li>
          <li><Link to="/admin" className="block md:inline-block px-4 py-2 hover:text-green-500" onClick={() => setIsMenuOpen(false)}>Admin</Link></li>
          <li><Link to="/roulette" className="block md:inline-block px-4 py-2 hover:text-green-500" onClick={() => setIsMenuOpen(false)}>Ruleta</Link></li>
          {/* <li><Link to="/payments" className="block md:inline-block px-4 py-2 hover:text-green-500" onClick={() => setIsMenuOpen(false)}>Pagos</Link></li> */}
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/roulette" element={<Roulette />} />
        <Route path="/payments" element={<Payments />} />
      </Routes>
    </div>
  );
}

export default App;
