import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './components/Home';
import EventDetail from './components/EventDetail';
import Admin from './components/Admin';
import Roulette from './components/Roulette';
import Payments from './components/Payments';
import GenreEvents from './components/GenreEvents';
import TopNavbar from './components/TopNavbar';
import "@fontsource/rajdhani";
import Tickets from './components/Tickets';
import MobileNavbar from './components/MobileNavbar';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen text-white" style={{
      background: 'linear-gradient(225deg, #e11d48 5%, #000 15%, #000 25%,  #7c3aed 35%, #000 45%, #000 55%, #1d4ed8 65%, #000 75%, #000 85%, #06b6d4 95%)',
      backgroundSize: '400% 400%',
      animation: 'gradientShift 10s ease infinite',
    }}>
      <TopNavbar />
      <div className="content-area pb-20 md:pb-0 md:pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/evento/:id" element={<EventDetail />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/ruleta" element={<Roulette />} />
          <Route path="/pagos" element={<Payments />} />
          <Route path="/genero/:genreId" element={<GenreEvents />} />
          <Route path="/tickets" element={<Tickets />} />
        </Routes>
      </div>

      <MobileNavbar />
    </div>
  );
}

export default App;
