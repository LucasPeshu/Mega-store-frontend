import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { get_productos } from "../../../../redux/actions/productos/productos";
import { get_marcas } from "../../../../redux/actions/marcas/marcas"; // Asumo que tienes esta acción
import { get_subcategorias } from "../../../../redux/actions/subcategorias/subcategorias"; // Asumo que tienes esta acción
import { Link } from "react-router-dom";
import axios from "axios";

const LoadingCard = () => <div className="card_load_extreme_descripion"></div>;

const Productos = ({
  get_productos,
  get_marcas,
  get_subcategorias,
  productos,
  marcas,
  subcategorias,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    tamano: "",
    color: "",
    urlImagen: "",
    precioUnitario: "",
    stock: "",
    umbralBajoStock: "",
    marcaId: "",
    subCategoriaId: "",
  });
  const [error, setError] = useState("");

  const coloresDisponibles = [
    "Rojo",
    "Azul",
    "Verde",
    "Amarillo",
    "Negro",
    "Blanco",
  ];

  const tamanosDisponibles = ["XS", "S", "M", "L", "XL", "XXL"];

  useEffect(() => {
    get_productos();
    get_marcas();
    get_subcategorias();
  }, [get_productos, get_marcas, get_subcategorias]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    // Validación básica
    if (
      !formData.nombre ||
      !formData.descripcion ||
      !formData.tamano ||
      !formData.color ||
      !formData.urlImagen ||
      !formData.precioUnitario ||
      !formData.stock ||
      !formData.umbralBajoStock ||
      !formData.marcaId ||
      !formData.subCategoriaId
    ) {
      setError("Por favor completa todos los campos.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/productos/registrar", {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        tamano: formData.tamano,
        color: formData.color,
        urlImagen: formData.urlImagen,
        precioUnitario: parseFloat(formData.precioUnitario),
        stock: parseInt(formData.stock),
        umbralBajoStock: parseInt(formData.umbralBajoStock),
        marcaId: parseInt(formData.marcaId),
        subCategoriaId: parseInt(formData.subCategoriaId),
        estaActivo: true,
      });

      setShowModal(false);
      setFormData({
        nombre: "",
        descripcion: "",
        tamano: "",
        color: "",
        urlImagen: "",
        precioUnitario: "",
        stock: "",
        umbralBajoStock: "",
        marcaId: "",
        subCategoriaId: "",
      });
      setError("");
      get_productos();
    } catch (err) {
      console.error("Error al crear el producto:", err);
      setError(
        "Hubo un error al crear el producto. Revisa los datos e intenta nuevamente."
      );
    }
  };

  return (
    <div className="p-4 min-h-screen mt-16">
      <div className="flex justify-between mb-4">
        <h1 className="font-bold text-4xl">Productos:</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex w-full justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-700"
          >
            Crear
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 overflow-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold mb-4">Crear Producto</h2>

            {error && <p className="text-red-600 mb-4">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Descripción
                </label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tamaño
                </label>
                <select
                  name="tamano"
                  value={formData.tamano}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                >
                  <option value="">-- Selecciona un tamaño --</option>
                  {tamanosDisponibles.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Color
                </label>
                <select
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                >
                  <option value="">-- Selecciona un color --</option>
                  {coloresDisponibles.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  URL Imagen
                </label>
                <input
                  type="url"
                  name="urlImagen"
                  value={formData.urlImagen}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                  placeholder="https://example.com/imagen.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Precio Unitario
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="precioUnitario"
                  value={formData.precioUnitario}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Umbral Bajo Stock
                </label>
                <input
                  type="number"
                  name="umbralBajoStock"
                  value={formData.umbralBajoStock}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Marca
                </label>
                <input
                  type="number"
                  name="marcaId"
                  value={formData.marcaId}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Subcategoría
                </label>
                <input
                  type="number"
                  name="subCategoriaId"
                  value={formData.subCategoriaId}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  setError("");
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreate}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lista de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productos && productos.length > 0 ? (
          productos.map((producto) => (
            <Link
              to={`/admin/productos/${producto.id}`}
              key={producto.id}
              className="bg-white shadow-md"
            >
              <div>
                <img
                  src={producto.urlImagen}
                  alt={producto.nombre}
                  className="w-full h-48 object-cover rounded-t-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/300x200?text=Sin+Imagen";
                  }}
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {producto.nombre}
                  </h2>
                  <p className="text-gray-600">{producto.descripcion}</p>
                  <p className="text-gray-900 font-bold mt-2">
                    ${producto.precioUnitario}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-600">No hay productos disponibles.</p>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  productos: state.productos.productos,
  marcas: state.marcas.marcas, // asumo que tienes esta parte en redux
  subcategorias: state.subcategorias.subcategorias, // asumo que tienes esta parte en redux
});

export default connect(mapStateToProps, {
  get_productos,
  get_marcas,
  get_subcategorias,
})(Productos);
