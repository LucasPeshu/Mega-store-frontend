import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { get_subcategorias } from "../../../../redux/actions/subcategorias/subcategorias";
import { get_categorias } from "../../../../redux/actions/categorias/categorias";
import { Link } from "react-router-dom";
import axios from "axios";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

const Subcategorias = ({
  get_subcategorias,
  get_categorias,
  subcategorias,
  categorias,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    get_subcategorias();
    get_categorias();
  }, [get_subcategorias, get_categorias]);

  const onSubmitCreate = async (e) => {
    e.preventDefault();

    if (!nombre || !descripcion || !categoriaId) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    const nuevaSubcategoria = {
      nombre,
      descripcion,
      estaActivo: true,
      categoriaId,
    };

    try {
      await axios.post(
        "http://localhost:8080/api/subcategorias/registrar",
        nuevaSubcategoria,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setShowModal(false);
      setNombre("");
      setDescripcion("");
      setCategoriaId("");
      setError("");
      get_subcategorias();
    } catch (err) {
      setError("Error al crear la subcategoría.");
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto px-6 sm:px-4 lg:px-48 py-12 min-h-screen mt-16">
      <div className="flex justify-between mb-4">
        <h1 className="font-bold text-4xl">Subcategorías:</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex w-full justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:text-sm"
          >
            Crear
          </button>
        </div>
      </div>

      {subcategorias && subcategorias.length > 0 ? (
        <div className="w-full">
          <div className="grid grid-cols-3 font-bold text-lg border-b-2 border-gray-200 pb-2 mb-2">
            <span>Editar</span>
            <span>Nombre</span>
            <span>Descripción</span>
          </div>

          {subcategorias.map((subcategoria) => (
            <div
              key={subcategoria.id}
              className="grid grid-cols-3 items-center border-b border-gray-200 py-2"
            >
              <Link
                to={`/admin/subcategoria/${subcategoria.id}`}
                className="flex"
              >
                <PencilSquareIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
              </Link>
              <span className="text-gray-800">{subcategoria.nombre}</span>
              <span className="text-gray-600">{subcategoria.descripcion}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-4xl font-bold text-gray-800">
          No hay subcategorías
        </div>
      )}

      {/* Modal para crear subcategoría */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Crear Subcategoría</h2>

            {error && <p className="text-red-600 mb-2">{error}</p>}

            <form onSubmit={onSubmitCreate}>
              <div className="mb-4">
                <label className="block text-sm font-medium">Nombre</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full border rounded p-2"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Descripción</label>
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className="w-full border rounded p-2"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Categoría</label>
                <select
                  value={categoriaId}
                  onChange={(e) => setCategoriaId(e.target.value)}
                  className="w-full border rounded p-2"
                  required
                >
                  <option value="" disabled>
                    Selecciona una categoría
                  </option>
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Crear
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setError("");
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  subcategorias: state.subcategorias.subcategorias,
  categorias: state.categorias.categorias,
});

export default connect(mapStateToProps, { get_subcategorias, get_categorias })(
  Subcategorias
);
