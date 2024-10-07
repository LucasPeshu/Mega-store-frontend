import { connect } from "react-redux";
import { useEffect, useState } from 'react';
import { get_marca_detail } from "../../../../redux/actions/marcas/marcas";
import { useParams } from "react-router-dom";
import axios from "axios";

function MarcaDetalle({ get_marca_detail, marca }) {
  const params = useParams();
  const id = params.id;

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    if (marca) {
      setNombre(marca.nombre);
      setDescripcion(marca.descripcion);
    }
  }, [marca]);

  useEffect(() => {
    get_marca_detail(id);
  }, [get_marca_detail, id]);

  const onSubmitDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/marcas/eliminar/${id}`);
      get_marca_detail(id);
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/marcas/actualizar/${id}`, {
        nombre,
        descripcion,
      });
      get_marca_detail(id); // Actualizar el detalle después de la edición
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {
      marca ?
      <div className="p-4">
        <div className="flex justify-between">
          <div className="text-4xl font-bold">{marca.nombre}</div>
          <div className="flex gap-2">
            <button 
              type="submit"
              onClick={() => onSubmitDelete(marca.id)}
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 sm:text-sm">
              <span>Eliminar</span>
            </button>
          </div>
        </div>


        <form onSubmit={onSubmitUpdate} className="mt-4">
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input 
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="p-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea 
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className=" p-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <button 
            type="submit"
            className="inline-flex w-full py-2 justify-center rounded-md border border-transparent bg-blue-600 px-4 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-sm">
            Actualizar
          </button>
        </form>

        
      </div>
      :
      <>Esta marca no existe o fue eliminada</>}
    </div>
  );
}

const mapStateToProps = (state) => ({
  marca: state.marcas.marca,
});

export default connect(mapStateToProps, { get_marca_detail })(MarcaDetalle);
