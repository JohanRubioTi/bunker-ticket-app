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
    <div className="min-h-screen bg-black text-white">
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
