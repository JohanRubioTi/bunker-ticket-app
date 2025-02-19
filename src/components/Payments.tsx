import React, { useState } from 'react';

const Payments: React.FC = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentStatus('processing');

    setTimeout(() => {
      const success = Math.random() < 0.8;

      if (success) {
        setPaymentStatus('success');
      } else {
        setPaymentStatus('error');
      }
    }, 2000);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Detalles del Pago</h1>

      {paymentStatus === 'success' && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">¡Éxito!</strong>
          <span className="block sm:inline"> Tu pago fue procesado exitosamente.</span>
        </div>
      )}

      {paymentStatus === 'error' && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">¡Error!</strong>
          <span className="block sm:inline"> Hubo un problema al procesar tu pago. Por favor, inténtalo de nuevo.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-300">Número de Tarjeta:</label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="XXXX XXXX XXXX XXXX"
            className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-300">Fecha de Expiración:</label>
          <input
            type="text"
            id="expiryDate"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/AA"
            className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="cvv" className="block text-sm font-medium text-gray-300">CVV:</label>
          <input
            type="text"
            id="cvv"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="XXX"
            className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-300">Nombre en la Tarjeta:</label>
          <input
            type="text"
            id="nameOnCard"
            value={nameOnCard}
            onChange={(e) => setNameOnCard(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 text-black"
            required
          />
        </div>

        <button
          type="submit"
          disabled={paymentStatus === 'processing'}
          className={`${paymentStatus === 'processing' ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-700'} text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
        >
          {paymentStatus === 'processing' ? 'Procesando...' : 'Pagar Ahora'}
        </button>
      </form>
    </div>
  );
};

export default Payments;
