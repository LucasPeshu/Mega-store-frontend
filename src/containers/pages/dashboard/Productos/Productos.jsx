import React, { useEffect } from "react";
import { connect } from "react-redux";
import { get_productos } from "../../../../redux/actions/productos/productos";
import { Link } from "react-router-dom";

const LoadingCard = () => <div className="card_load_extreme_descripion"></div>;

const Productos = ({ get_productos, productos }) => {
  useEffect(() => {
    get_productos();
  }, [get_productos]);

  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Productos
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productos && productos.length > 0 ? (
          productos.map((producto) => (
            <Link
              to={`/productos/${producto.id}`}
              key={producto.id}
              className="bg-white shadow-md"
            >
              <LoadingCard />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {producto.nombre}
                </h2>
                <p className="text-gray-600">{producto.descripcion}</p>
                <p className="text-gray-900 font-bold mt-2">
                  ${producto.precioUnitario}
                </p>
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
});

export default connect(mapStateToProps, { get_productos })(Productos);
