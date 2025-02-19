import React, { useState, useEffect } from 'react';

const Roulette: React.FC = () => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState('');
  const prizes = ['Boleta Gratis', '10% Descuento', '20% Descuento', 'Bebida Gratis', 'Acceso VIP', '5% Descuento', 'Intenta de Nuevo', '15% Descuento'];

  const spinRoulette = () => {
    setSpinning(true);
    setResult('');

    const spinDuration = Math.random() * 3000 + 3000;

    setTimeout(() => {
      setSpinning(false);
      const prizeIndex = Math.floor(Math.random() * prizes.length);
      setResult(prizes[prizeIndex]);
    }, spinDuration);
  };

  useEffect(() => {
    if (spinning) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [spinning]);

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">¡Gira la Ruleta para Ganar Premios!</h1>

      <div className={`roulette-wheel ${spinning ? 'spinning' : ''} mb-4 relative w-64 h-64 bg-gradient-to-r from-green-500 to-black rounded-full flex items-center justify-center`}>
        <div className="absolute top-[-15px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[20px] border-b-white"></div>

        {prizes.map((prize, index) => (
          <div
            key={index}
            className={`absolute w-1/2 h-1/2 top-0 left-1/2 transform origin-top-left`}
            style={{
              rotate: `${(index * 360 / prizes.length)}deg`,
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              backgroundColor: index % 2 === 0 ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)',
            }}
          >
            <div className="absolute top-1/4 left-1/4 text-xs text-white font-bold" style={{ transform: `rotate(${-45 + (index * 360 / prizes.length)}deg)` }}>{prize}</div>
          </div>
        ))}

        <div className="absolute w-16 h-16 rounded-full bg-white flex items-center justify-center border-2 border-green-400">
          <span className="text-sm font-bold">GIRAR</span>
        </div>
      </div>

      <button
        onClick={spinRoulette}
        disabled={spinning}
        className={`${spinning ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-700'} text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
      >
        {spinning ? 'Girando...' : '¡Gira para Ganar!'}
      </button>

      {result && !spinning && (
        <div className="mt-4 text-xl font-semibold">
          Ganaste: {result}
        </div>
      )}
    </div>
  );
};

export default Roulette;
