import React from 'react';

const Error404 = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <p className="text-2xl font-semibold text-gray-600 mt-4">Página no encontrada</p>
        <p className="text-gray-500 mt-2">Lo sentimos, la página que estás buscando no existe.</p>
        <a href="/" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
          Volver al inicio
        </a>
      </div>
    </div>
  );
};

export default Error404;