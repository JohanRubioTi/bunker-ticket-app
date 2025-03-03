import React, { useState } from 'react';

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ value, onChange }) => {
  const [quantity, setQuantity] = useState(value);

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onChange(newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = Math.max(1, quantity - 1); // Prevent going below 1
    setQuantity(newQuantity);
    onChange(newQuantity);
  };

 return (
    <div className="flex items-center  max-w-xs">
      <button
        className="bg-transparent hover:bg-green-500 text-green-500 hover:text-white font-bold py-1 px-2"
        onClick={handleDecrement}
      >
        -
      </button>
      <span className="px-2 text-white text-lg">{quantity}</span>
      <button
        className="bg-transparent hover:bg-green-500 text-green-500 hover:text-white font-bold py-1 px-2"
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
