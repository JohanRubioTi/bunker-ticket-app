import React, { useState, useRef } from 'react';

const Roulette: React.FC = () => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [prizeIndex, setPrizeIndex] = useState<number | null>(null);
  const prizes = [1, 2, 3, 4, 5, 6, 7, 8];
  const segmentsRef = useRef<HTMLDivElement[]>([]);

  const spinRoulette = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    setPrizeIndex(null);

    const randomPrizeIndex = Math.floor(Math.random() * prizes.length);
    const spinDuration = 5000; // 5 seconds

    // Calculate rotation angle for each segment
    const segmentDegrees = 360 / prizes.length;
    // Calculate the final rotation angle to land on the chosen prize
    const finalRotation = segmentDegrees * randomPrizeIndex + 360 * 10; // Add extra rotations for effect

    const wheel = document.querySelector('.roulette-wheel') as HTMLElement;
    if (wheel) {
      wheel.style.transition = `transform ${spinDuration / 1000}s cubic-bezier(0.25, 0.89, 0.5, 1.03)`; // Easing function
      wheel.style.transform = `rotate(-${finalRotation}deg)`; // Negative to spin in correct direction
    }

    setTimeout(() => {
      setSpinning(false);
      setResult(String(prizes[randomPrizeIndex]));
      setPrizeIndex(randomPrizeIndex);
      if (wheel) {
        wheel.style.transition = 'none'; // Remove transition for next spin
        wheel.style.transform = `rotate(${-segmentDegrees * randomPrizeIndex}deg)`; // Keep final position
      }
    }, spinDuration);
  };


  return (
    <div className="roulette-container">
      <h1>¡Gira la Ruleta!</h1>
      <div className={`roulette-wheel ${spinning ? 'spinning' : ''}`}>
        {prizes.map((prize, index) => (
          <div
            key={index}
            className="roulette-segment"
            style={{ transform: `rotate(${index * (360 / prizes.length)}deg)` }}
            ref={(el) => (segmentsRef.current[index] = el!)}
          >
            <span>{prize}</span>
          </div>
        ))}
      </div>
      <button
        className="roulette-button"
        onClick={spinRoulette}
        disabled={spinning}
      >
        {spinning ? 'Girando...' : 'Girar'}
      </button>
      {result && <div className="roulette-result">¡Ganaste: {result}!</div>}
    </div>
  );
};

export default Roulette;
