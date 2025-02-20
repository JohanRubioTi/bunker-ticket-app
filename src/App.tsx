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
        </Routes>
      </div>

      <nav className="fixed bottom-0 left-0 w-full bg-gray-900 bg-opacity-75 border-t border-green-500 backdrop-blur-sm z-50 md:hidden">
        <ul className="flex justify-around p-2">
          <li className="nav-item">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h.375M2 15h.375M2 18h.375m2.625-3h16.5m-16.5-6a1.5 1.5 0 01-3 0m3 6a1.5 1.5 0 01-3 0m3 6a1.5 1.5 0 01-3 0m9-1.5V12m0 0v-1.5m0 1.5v1.5m-3-3V15m0 0v-1.5m0 1.5v1.5m-3-3V12.75m0 0V12m0 .75v.75" />
              </svg>
              <span className="nav-text">Inicio</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin" className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9V7.5c0-.966.783-1.75 1.75-1.75h16.5c.966 0 1.75.784 1.75 1.75V9m-1.5-3h-5.108c-.138 0-.274-.027-.402-.08-.338-.147-.577-.387-.72-.725C12.958 4.283 12.287 4 11.5 4h-1c-.787 0-1.458.283-1.995.725-.143.338-.382.578-.72.725-.128.053-.264.08-.402.08H5.25M9 9h6m-6 3h6m-6 3h6" />
              </svg>
              <span className="nav-text">Admin</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/ruleta" className={`nav-link ${location.pathname === '/ruleta' ? 'active' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.932 3.374h14.023c1.715 0 2.8-1.874 1.932 3.374l-7.5-12.75a2.25 2.25 0 00-2.237-2.826H5.208a2.25 2.25 0 00-2.237 2.826l-7.5 12.75z" />
              </svg>
              <span className="nav-text">Ruleta</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
