import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { get_productos } from "../../redux/actions/productos/productos";
import { Link } from "react-router-dom";
import { FiHome, FiChevronRight } from "react-icons/fi";

const Products = ({ get_productos, productos }) => {
  useEffect(() => {
    get_productos();
  }, [get_productos]);

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
        <span className="text-gray-900 font-medium">Productos</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Nuestros Productos
        </h1>
        <p className="text-gray-600">
          Descubre nuestra amplia selección de productos de alta calidad
        </p>
      </div>

      {/* Lista de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {productos && productos.length > 0 ? (
          productos.map((producto) => (
            <Link
              to={`/productos/${producto.id}`}
              key={producto.id}
              className="group block"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
                {/* Imagen */}
                <div className="relative overflow-hidden">
                  <div className="aspect-[4/3] relative">
                    <img
                      src={producto.urlImagen}
                      alt={producto.nombre}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/300x200?text=Sin+Imagen";
                      }}
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Precio destacado */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    ${producto.precioUnitario}
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-6">
                  <div className="mb-3">
                    <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                      {producto.nombre}
                    </h2>
                    <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                      {producto.descripcion}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-xs text-gray-500 font-medium">
                        Disponible
                      </span>
                    </div>

                    <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors duration-200">
                      <span className="text-sm font-medium mr-1">Ver más</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v1M7 7h10"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-lg font-medium">
              No hay productos disponibles
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Vuelve más tarde para ver nuestros productos
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  productos: state.productos.productos,
});

export default connect(mapStateToProps, {
  get_productos,
})(Products);
