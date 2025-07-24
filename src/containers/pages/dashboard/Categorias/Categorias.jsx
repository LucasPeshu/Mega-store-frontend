import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { get_categorias } from "../../../../redux/actions/categorias/categorias";
import { Link } from "react-router-dom";
import axios from "axios";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

const Categorias = ({ get_categorias, categorias }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    get_categorias();
  }, [get_categorias]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitCreate = async (e) => {
    e.preventDefault();
    setError("");

    const nuevaCategoria = {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      estaActivo: true,
    };

    try {
      await axios.post(
        "http://localhost:8080/api/categorias/registrar",
        nuevaCategoria,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setShowModal(false);
      setFormData({ nombre: "", descripcion: "" });
      get_categorias();
    } catch (err) {
      console.error("Error al crear la categoría:", err);
      setError("No se pudo crear la categoría. Verifica los datos.");
    }
  };

  return (
    <div className="container mx-auto px-6 sm:px-4 lg:px-44 py-12 min-h-screen mt-16">
      <div className="flex justify-between mb-4">
        <h1 className="font-bold text-4xl">Categorías:</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex w-full justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:text-sm"
          >
            Crear
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Crear Categoría</h2>
            {error && (
              <div className="mb-2 text-red-600 font-medium text-sm">
                {error}
              </div>
            )}
            <form onSubmit={onSubmitCreate} className="flex flex-col gap-4">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="descripcion"
                placeholder="Descripción"
                value={formData.descripcion}
                onChange={handleChange}
                required
                className="border p-2 rounded"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setFormData({ nombre: "", descripcion: "" });
                    setError("");
                  }}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
                >
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabla de categorías */}
      {categorias && categorias.length > 0 ? (
        <div className="w-full">
          <div className="grid grid-cols-3 font-bold text-lg border-b-2 border-gray-200 pb-2 mb-2">
            <span>Editar</span>
            <span>Nombre</span>
            <span>Descripción</span>
          </div>

          {categorias.map((categoria) => (
            <div
              key={categoria.id}
              className="grid grid-cols-3 items-center border-b border-gray-200 py-2"
            >
              <Link to={`/admin/categoria/${categoria.id}`} className="flex">
                <PencilSquareIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
              </Link>
              <span className="text-gray-800">{categoria.nombre}</span>
              <span className="text-gray-600">{categoria.descripcion}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-4xl font-bold text-gray-800">
          No hay categorías
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  categorias: state.categorias.categorias,
});

export default connect(mapStateToProps, { get_categorias })(Categorias);
