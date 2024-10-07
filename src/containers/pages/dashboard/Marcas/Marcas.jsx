import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { get_marcas } from '../../../../redux/actions/marcas/marcas';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Marcas = ({get_marcas, marcas}) => {
  useEffect(() => {
    get_marcas();
  }, [get_marcas]);

  const onSubmitCreate = async () => {
    const idUnico = Date.now();
    const nuevaMarca = {
      nombre: `default${idUnico}`,
      descripcion: 'default',
      estaActivo: true
    };

    try {
      await axios.post('http://localhost:8080/marcas/registrar', nuevaMarca, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      get_marcas();
    } catch (err) {
      console.error('Error al crear la marca:', err);
    }
  };

  return (
    
    <div className="p-4">
      <div className='flex justify-between mb-4'>
        <h1 className='font-bold text-4xl'>Marcas:</h1>
        <div className="flex gap-2">
          <button 
            type='submit'
            onClick={onSubmitCreate}
            className='inline-flex w-full justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:text-sm'>Crear</button>
        </div>
      </div>
      {marcas && marcas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {marcas.map((marca) => (
            <Link to={`/marcas/${marca.id}`} className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-2xl font-bold text-gray-800">{marca.nombre}</h2>
                <p className="text-gray-600">{marca.descripcion}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-4xl font-bold text-gray-800">No hay marcas</div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  marcas: state.marcas.marcas,
});

export default connect(mapStateToProps, { get_marcas })(Marcas);