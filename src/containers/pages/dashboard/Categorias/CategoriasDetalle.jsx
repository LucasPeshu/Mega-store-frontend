import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { get_categorias_detail } from "../../../../redux/actions/categorias/categorias";
import { useParams } from "react-router-dom";
import axios from "axios";
import Categorias from "./Categorias";

function CategoriaDetalle({ get_categorias_detail, categoria }) {
  const params = useParams();
  const id = params.id;

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [showModalError, setShowModalError] = useState(false); // Estado para controlar el modal de error
  const [showModalSuccess, setShowModalSuccess] = useState(false); // Estado para controlar el modal de éxito
  const [errorMessage, setErrorMessage] = useState(""); // Estado para almacenar el mensaje de error

  useEffect(() => {
    if (categoria) {
      setNombre(categoria.nombre);
      setDescripcion(categoria.descripcion);
    }
  }, [categoria]);

  useEffect(() => {
    get_categorias_detail(id);
  }, [get_categorias_detail, id]);

  const onSubmitDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/categorias/eliminar/${id}`);
      get_categorias_detail(id);
    } catch (err) {
      setErrorMessage("Error al eliminar la categoría.");
      setShowModalError(true); // Mostrar modal de error
    }
  };

  const onSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/categorias/actualizar/${id}`, {
        nombre,
        descripcion,
      });
      get_categorias_detail(id); // Actualizar el detalle después de la edición
      setShowModalSuccess(true); // Mostrar modal de éxito
    } catch (err) {
      setErrorMessage("Error al actualizar la categoría.");
      setShowModalError(true); // Mostrar modal de error
    }
  };

  const onCancel = () => {
    setNombre(categoria.nombre);
    setDescripcion(categoria.descripcion);
  };

  const closeModal = () => {
    setShowModalError(false);
    setShowModalSuccess(false);
    setErrorMessage("");
  };

  return (
    <div>
      {categoria ? (
        <div className="container mx-auto px-6 sm:px-4 lg:px-48 py-12 min-h-screen mt-16">
          <div className="flex justify-between">
            <div className="text-4xl font-bold">{categoria.nombre}</div>
            <div className="flex gap-2">
              <button
                type="submit"
                onClick={() => onSubmitDelete(categoria.id)}
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 sm:text-sm"
              >
                <span>Eliminar</span>
              </button>
            </div>
          </div>

          <form onSubmit={onSubmitUpdate} className="mt-4">
            <div className="mb-4">
              <label
                htmlFor="nombre"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre
              </label>
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
              <label
                htmlFor="descripcion"
                className="block text-sm font-medium text-gray-700"
              >
                Descripción
              </label>
              <textarea
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className=" p-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div className="flex justify-between gap-4">
              <button
                type="submit"
                className="inline-flex w-full py-2 justify-center rounded-md border border-transparent bg-blue-600 px-4 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-sm"
              >
                Actualizar
              </button>

              <button
                type="button"
                onClick={onCancel}
                className="inline-flex w-full py-2 justify-center rounded-md border border-transparent bg-gray-500 px-4 text-base font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 sm:text-sm"
              >
                Cancelar
              </button>
            </div>
          </form>

          {/* Modal de error */}
          {showModalError && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Error</h2>
                <p>{errorMessage}</p>
                <button
                  onClick={closeModal}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}

          {/* Modal de éxito */}
          {showModalSuccess && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Éxito</h2>
                <p>La categoría se ha actualizado correctamente.</p>
                <button
                  onClick={closeModal}
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>Esta categoría no existe o fue eliminada</>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  categoria: state.categorias.categoria,
});

export default connect(mapStateToProps, { get_categorias_detail })(
  CategoriaDetalle
);
