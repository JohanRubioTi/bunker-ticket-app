import React, { useState } from 'react';

const Admin: React.FC = () => {
  const [nombreEvento, setNombreEvento] = useState('');
  const [fechaEvento, setFechaEvento] = useState('');
  const [descripcionEvento, setDescripcionEvento] = useState('');
  const [precioEvento, setPrecioEvento] = useState('');
  const [imagenEventoUrl, setImagenEventoUrl] = useState('');
  const [generoEventoId, setGeneroEventoId] = useState('');
  const [eventos, setEventos] = useState<any[]>([]);

  const [nombreGenero, setNombreGenero] = useState('');
  const [imagenGeneroUrl, setImagenGeneroUrl] = useState('');
  const [generos, setGeneros] = useState<any[]>([]);

  const handleSubmitEvento = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevoEvento = {
      id: Date.now().toString(),
      nombre: nombreEvento,
      fecha: fechaEvento,
      descripcion: descripcionEvento,
      precio: parseFloat(precioEvento),
      imageUrl: imagenEventoUrl,
      genreId: generoEventoId,
    };
    setEventos([...eventos, nuevoEvento]);
    setNombreEvento('');
    setFechaEvento('');
    setDescripcionEvento('');
    setPrecioEvento('');
    setImagenEventoUrl('');
    setGeneroEventoId('');
    console.log('Nuevo evento creado:', nuevoEvento);
  };

  const handleSubmitGenero = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevoGenero = {
      id: Date.now().toString(),
      nombre: nombreGenero,
      imageUrl: imagenGeneroUrl,
    };
    setGeneros([...generos, nuevoGenero]);
    setNombreGenero('');
    setImagenGeneroUrl('');
    console.log('Nuevo género creado:', nuevoGenero);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Panel de Administración</h1>

      <h2 className="text-2xl font-semibold mb-2">Crear Nuevo Evento</h2>
      <form onSubmit={handleSubmitEvento} className="mb-8">
        <div className="mb-4">
          <label htmlFor="nombreEvento" className="block text-sm font-medium text-gray-300">Nombre del Evento:</label>
          <input
            type="text"
            id="nombreEvento"
            value={nombreEvento}
            onChange={(e) => setNombreEvento(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="fechaEvento" className="block text-sm font-medium text-gray-300">Fecha del Evento:</label>
          <input
            type="date"
            id="fechaEvento"
            value={fechaEvento}
            onChange={(e) => setFechaEvento(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="descripcionEvento" className="block text-sm font-medium text-gray-300">Descripción del Evento:</label>
          <textarea
            id="descripcionEvento"
            value={descripcionEvento}
            onChange={(e) => setDescripcionEvento(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="precioEvento" className="block text-sm font-medium text-gray-300">Precio del Evento:</label>
          <input
            type="number"
            id="precioEvento"
            value={precioEvento}
            onChange={(e) => setPrecioEvento(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="imagenEventoUrl" className="block text-sm font-medium text-gray-300">URL de la Imagen del Evento:</label>
          <input
            type="url"
            id="imagenEventoUrl"
            value={imagenEventoUrl}
            onChange={(e) => setImagenEventoUrl(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="generoEventoId" className="block text-sm font-medium text-gray-300">Género del Evento:</label>
          <select
            id="generoEventoId"
            value={generoEventoId}
            onChange={(e) => setGeneroEventoId(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 text-black"
            required
          >
            <option value="">Selecciona un Género</option>
            {generos.map((genero) => (
              <option key={genero.id} value={genero.id}>{genero.nombre}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Crear Evento
        </button>
      </form>

      <h2 className="text-2xl font-semibold mb-2">Administrar Géneros</h2>
      <form onSubmit={handleSubmitGenero} className="mb-8">
        <div className="mb-4">
          <label htmlFor="nombreGenero" className="block text-sm font-medium text-gray-300">Nombre del Género:</label>
          <input
            type="text"
            id="nombreGenero"
            value={nombreGenero}
            onChange={(e) => setNombreGenero(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="imagenGeneroUrl" className="block text-sm font-medium text-gray-300">URL de la Imagen del Género:</label>
          <input
            type="url"
            id="imagenGeneroUrl"
            value={imagenGeneroUrl}
            onChange={(e) => setImagenGeneroUrl(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 text-black"
            required
          />
        </div>
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Crear Género
        </button>
      </form>

      <h2 className="text-2xl font-semibold mb-2">Géneros</h2>
      <ul>
        {generos.map((genero) => (
          <li key={genero.id} className="mb-2">
            {genero.nombre}
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mb-2">Eventos</h2>
      <ul>
        {eventos.map((evento) => (
          <li key={evento.id} className="mb-2">
            {evento.nombre} - {evento.fecha} - ${evento.precio}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
