"use client";

import {
  FiShoppingCart,
  FiHeart,
  FiUser,
  FiSearch,
  FiMenu,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiHeadphones,
  FiStar,
  FiArrowRight,
  FiX,
} from "react-icons/fi";
import { useState } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const featuredProducts = [
    {
      id: 1,
      name: "Camiseta Premium Negra",
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.8,
      reviews: 124,
      image:
        "https://png.pngtree.com/png-vector/20241102/ourmid/pngtree-premium-black-t-shirt-mockup-png-image_14226805.png",
    },
    {
      id: 2,
      name: "Camiseta Clásica",
      price: 24.99,
      originalPrice: 34.99,
      rating: 4.6,
      reviews: 89,
      image:
        "https://png.pngtree.com/png-vector/20241102/ourmid/pngtree-premium-black-t-shirt-mockup-png-image_14226805.png",
    },
    {
      id: 3,
      name: "Camiseta Deportiva",
      price: 34.99,
      originalPrice: 44.99,
      rating: 4.9,
      reviews: 156,
      image:
        "https://png.pngtree.com/png-vector/20241102/ourmid/pngtree-premium-black-t-shirt-mockup-png-image_14226805.png",
    },
    {
      id: 4,
      name: "Camiseta Casual",
      price: 19.99,
      originalPrice: 29.99,
      rating: 4.5,
      reviews: 67,
      image:
        "https://png.pngtree.com/png-vector/20241102/ourmid/pngtree-premium-black-t-shirt-mockup-png-image_14226805.png",
    },
  ];

  const categories = [
    { name: "Camisetas", count: "120+ productos", color: "bg-blue-500" },
    { name: "Pantalones", count: "85+ productos", color: "bg-green-500" },
    { name: "Zapatos", count: "95+ productos", color: "bg-purple-500" },
    { name: "Accesorios", count: "150+ productos", color: "bg-orange-500" },
  ];

  return (
    <div className="mt-12 bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Descubre tu Estilo
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Las mejores marcas y tendencias al mejor precio
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 flex items-center justify-center">
                Explorar Productos
                <FiArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300">
                Ver Ofertas
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Las marcas con las que trabajamos
            </h3>
            <p className="text-gray-600 text-lg">
              Encuentra exactamente lo que buscas
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div
                  className={`${category.color} rounded-lg p-8 text-white text-center hover:scale-105 transition duration-300`}
                >
                  <h4 className="text-xl font-semibold mb-2">
                    {category.name}
                  </h4>
                  <p className="text-sm opacity-90">{category.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Productos Destacados
            </h3>
            <p className="text-gray-600 text-lg">
              Los más vendidos de la temporada
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 group"
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition duration-300">
                      <FiHeart className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                  {product.originalPrice > product.price && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                      -
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100
                      )}
                      %
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h4>

                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      ({product.reviews})
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">
                        ${product.price}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-lg text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center">
                    <FiShoppingCart className="h-5 w-5 mr-2" />
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTruck className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Envío Gratis
              </h4>
              <p className="text-gray-600">En compras superiores a $50</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiShield className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Compra Segura
              </h4>
              <p className="text-gray-600">Protección total en tus pagos</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiRefreshCw className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Devoluciones
              </h4>
              <p className="text-gray-600">
                30 días para cambios y devoluciones
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiHeadphones className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Soporte 24/7
              </h4>
              <p className="text-gray-600">
                Atención al cliente siempre disponible
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-4">Mantente al día</h3>
          <p className="text-gray-300 text-lg mb-8">
            Recibe las últimas ofertas y novedades directamente en tu email
          </p>

          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Tu email"
              className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 px-6 py-3 rounded-r-lg hover:bg-blue-700 transition duration-300 font-semibold">
              Suscribirse
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
