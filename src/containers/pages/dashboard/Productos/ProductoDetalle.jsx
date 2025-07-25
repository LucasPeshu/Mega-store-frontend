import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { get_productos_detail } from "../../../../redux/actions/productos/productos";
import { get_subcategorias } from "../../../../redux/actions/subcategorias/subcategorias";
import { get_marcas } from "../../../../redux/actions/marcas/marcas";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductoDetalle = ({
  get_productos_detail,
  producto,
  get_subcategorias,
  subcategorias,
  get_marcas,
  marcas,
}) => {
  const params = useParams();
  const id = params.id;

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tamano, setTamano] = useState("");
  const [color, setColor] = useState("");
  const [precioUnitario, setPrecioUnitario] = useState("");
  const [stock, setStock] = useState("");
  const [umbralBajoStock, setUmbralBajoStock] = useState("");
  const [marca, setMarca] = useState("");
  const [urlImagen, setUrlImagen] = useState("");
  const [subcategoria, setSubcategoria] = useState("");
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    get_productos_detail(id);
    get_subcategorias();
    get_marcas();
  }, [get_productos_detail, get_subcategorias, get_marcas, id]);

  useEffect(() => {
    if (
      producto &&
      Array.isArray(marcas) &&
      marcas.length > 0 &&
      Array.isArray(subcategorias) &&
      subcategorias.length > 0
    ) {
      setNombre(producto.nombre);
      setDescripcion(producto.descripcion);
      setTamano(producto.tamano);
      setColor(producto.color);
      setPrecioUnitario(producto.precioUnitario);
      setStock(producto.stock);
      setUmbralBajoStock(producto.umbralBajoStock || "");
      setMarca(producto.marca?.id || "");
      setSubcategoria(producto.subcategoria?.id || "");
      setUrlImagen(producto.urlImagen || "");
    }
  }, [producto, marcas, subcategorias]);

  const onSubmitDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/productos/eliminar/${id}`);
      window.location.reload(); // Recarga la página para reflejar el cambio
    } catch (err) {
      setErrorMessage("Error al eliminar el producto.");
      setShowModalError(true);
    }
  };

  const onSubmitReactive = async () => {
    try {
      await axios.put(`http://localhost:8080/api/productos/reactivar/${id}`);
      window.location.reload(); // Recarga la página para reflejar el cambio
    } catch (err) {
      setErrorMessage("Error al reactivar el producto.");
      setShowModalError(true);
    }
  };

  const onSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/productos/actualizar/${id}`, {
        nombre,
        descripcion,
        tamano,
        color,
        precioUnitario,
        stock,
        umbralBajoStock,
        marca,
        subcategoria,
        urlImagen,
      });
      setShowModalSuccess(true);
    } catch (err) {
      setErrorMessage("Error al actualizar el producto.");
      console.error(err);
      setShowModalError(true);
    }
  };

  const closeModal = () => {
    setShowModalSuccess(false);
    setShowModalError(false);
    setErrorMessage("");
  };

  return (
    <div className="min-h-screen container mx-auto px-6 sm:px-4 lg:px-48 py-12 mt-16">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold mb-4">Detalles del Producto</h1>
        {producto && (
          <div>
            {producto.estaActivo ? (
              <button
                onClick={onSubmitDelete}
                className="py-2 px-6 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Eliminar Producto
              </button>
            ) : (
              <button
                onClick={onSubmitReactive}
                className="py-2 px-6 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Reactivar Producto
              </button>
            )}
          </div>
        )}
      </div>

      <form onSubmit={onSubmitUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Tamaño</label>
          <input
            type="text"
            value={tamano}
            onChange={(e) => setTamano(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Color</label>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Precio Unitario</label>
          <input
            type="number"
            value={precioUnitario}
            onChange={(e) => setPrecioUnitario(e.target.value)}
            className="w-full p-2 border rounded"
            required
            min="0" // 🔒 Esto evita valores negativos
          />
        </div>

        <div>
          <label className="block text-sm font-medium">URL de la Imagen</label>
          <input
            type="url"
            value={urlImagen}
            onChange={(e) => setUrlImagen(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="https://..."
          />
        </div>

        {/* Vista previa de la imagen */}
        {urlImagen && (
          <div className="my-4">
            <img
              src={urlImagen}
              alt="Vista previa"
              className="max-w-xs max-h-64 border rounded"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full p-2 border rounded"
            required
            min="0" // ⛔ No permite valores negativos
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Umbral Bajo de Stock
          </label>
          <input
            type="number"
            value={umbralBajoStock}
            onChange={(e) => setUmbralBajoStock(e.target.value)}
            className="w-full p-2 border rounded"
            required
            min="0" // ⛔ No permite valores negativos
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Marca</label>
          <select
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Seleccione una marca</option>
            {(marcas || []).map((marca) => (
              <option key={marca.id} value={marca.id}>
                {marca.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Subcategoría</label>
          <select
            value={subcategoria}
            onChange={(e) => setSubcategoria(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Seleccione una subcategoría</option>
            {(subcategorias || []).map((subcat) => (
              <option key={subcat.id} value={subcat.id}>
                {subcat.nombre}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded"
        >
          Actualizar Producto
        </button>
      </form>

      {showModalSuccess && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold">Éxito</h2>
            <p>El producto se ha actualizado correctamente.</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {showModalError && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold">Error</h2>
            <p>{errorMessage}</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  producto: state.productos.producto,
  subcategorias: state.subcategorias.subcategorias,
  marcas: state.marcas.marcas,
});

export default connect(mapStateToProps, {
  get_productos_detail,
  get_subcategorias,
  get_marcas,
})(ProductoDetalle);
