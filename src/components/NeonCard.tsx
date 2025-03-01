import React from 'react';

interface NeonCardProps {
  children: React.ReactNode;
}

const NeonCard: React.FC<NeonCardProps> = ({ children }) => {
  return (
    <div className="rounded-lg border-2 border-green-500 bg-transparent p-4 shadow-lg transition-all duration-200 hover:shadow-xl mb-8">
      {children}
    </div>
  );
};

export default NeonCard;
