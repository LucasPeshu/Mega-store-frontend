import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { get_productos_detail } from "../../redux/actions/productos/productos";
import { get_subcategorias } from "../../redux/actions/subcategorias/subcategorias";
import { get_marcas } from "../../redux/actions/marcas/marcas";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FiHome, FiChevronRight } from "react-icons/fi";

const ProductDetail = ({
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
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    get_productos_detail(id);
    get_subcategorias();
    get_marcas();
  }, [get_productos_detail, get_subcategorias, get_marcas, id]);

  useEffect(() => {
    if (producto) {
      setNombre(producto.nombre);
      setDescripcion(producto.descripcion);
      setTamano(producto.tamano);
      setColor(producto.color);
      setPrecioUnitario(producto.precioUnitario);
      setStock(producto.stock);
      setUmbralBajoStock(producto.umbralBajoStock || "");
      setMarca(producto.marca || "");
      setSubcategoria(producto.subcategoria || "");
      setUrlImagen(producto.urlImagen || "");
    }
  }, [producto]);

  const coloresDisponibles = [
    { nombre: "azul", codigo: "#3B82F6", disponible: true },
    { nombre: "rojo", codigo: "#EF4444", disponible: true },
    { nombre: "verde", codigo: "#10B981", disponible: false },
    { nombre: "negro", codigo: "#1F2937", disponible: true },
    { nombre: "amarillo", codigo: "#FACC15", disponible: true },
    { nombre: "blanco", codigo: "#FFFFFF", disponible: true },
  ];

  const colorActual = coloresDisponibles.find(
    (c) => c.nombre.toLowerCase() === color?.toLowerCase()
  );

  const handleCantidadChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= stock) {
      setCantidad(value);
    }
  };

  const agregarAlCarrito = () => {
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];

    const productoExistente = carritoActual.find(
      (item) => item.id === producto.id
    );

    if (productoExistente) {
      const nuevaCantidad = productoExistente.cantidad + cantidad;
      if (nuevaCantidad <= stock) {
        productoExistente.cantidad = nuevaCantidad;
      } else {
        productoExistente.cantidad = stock; // máximo permitido
      }
    } else {
      carritoActual.push({
        id: producto.id,
        nombre,
        descripcion,
        tamano,
        color,
        precioUnitario,
        stock,
        marca,
        subcategoria,
        urlImagen,
        cantidad,
      });
    }

    localStorage.setItem("carrito", JSON.stringify(carritoActual));
    alert("Producto agregado al carrito");
  };

  return (
    <div className="container mx-auto px-6 sm:px-4 lg:px-48 min-h-screen mt-16 py-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <a
          href="/"
          className="flex items-center hover:text-blue-600 transition-colors"
        >
          <FiHome className="h-4 w-4 mr-1" />
          Inicio
        </a>
        <FiChevronRight className="h-4 w-4" />
        <a href="/productos">
          <span className="hover:text-blue-600">Productos</span>
        </a>
        <FiChevronRight className="h-4 w-4" />
        <span className="text-gray-900 font-medium">{nombre}</span>
      </nav>

      {/* Producto */}
      <div className="flex gap-8 flex-col-2 bg-white rounded-2xl p-6">
        <img
          src={urlImagen}
          alt="Vista previa"
          className="h-96 w-auto border rounded"
        />
        <div className="">
          <div className="text-3xl font-bold text-gray-900 mb-2">{nombre}</div>
          <div className="border-t border-gray-200 pt-6 text-md mb-3">
            <div className="text-2xl font-bold text-green-600">
              ${precioUnitario}
            </div>
          </div>
          <div>
            <h2 className=" font-semibold uppercase text-gray-500 mb-3">
              Descripción
            </h2>
            <p className="text-gray-900 leading-relaxed mb-3">{descripcion}</p>
          </div>
          <div className="flex gap-4">
            <div>
              <h3 className="text-md font-semibold uppercase text-gray-500 mb-3">
                Tamaño:{" "}
                <span className="text-gray-900 normal-case">{tamano}</span>
              </h3>
            </div>
            <div>
              <h3 className="text-md font-semibold uppercase text-gray-500 mb-3">
                Marca:{" "}
                <span className="text-gray-900 normal-case">
                  {marca.nombre}
                </span>
              </h3>
            </div>
          </div>

          <div>
            <h3 className="text-md font-semibold uppercase text-gray-500 mb-3">
              Categoría:{" "}
              <span className="text-gray-900 normal-case">
                {subcategoria.nombre}
              </span>
            </h3>
          </div>
          {colorActual ? (
            <div className="mb-3">
              <h3 className="text-md font-semibold uppercase text-gray-500 mb-3">
                Color:{" "}
                <span className="text-gray-900 normal-case">
                  {colorActual.nombre.charAt(0).toUpperCase() +
                    colorActual.nombre.slice(1)}
                </span>
              </h3>
              <div
                className="w-10 h-10 rounded-full border border-gray-300"
                style={{ backgroundColor: colorActual.codigo }}
              />
            </div>
          ) : (
            <div className="text-sm text-red-500">Color no disponible</div>
          )}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cantidad
            </label>
            <input
              type="number"
              value={cantidad}
              onChange={handleCantidadChange}
              min={1}
              max={stock}
              className="w-24 border border-gray-300 rounded px-2 py-1"
            />
          </div>

          <button
            onClick={agregarAlCarrito}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
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
})(ProductDetail);
