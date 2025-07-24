"use client";
import { FaShoppingBag, FaStar, FaTruck } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
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
    <div className="mt-16 bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden p-4">
        {/* Imagen de fondo con blur */}
        <img
          src="https://i.blogs.es/787248/puma/1366_2000.jpeg"
          alt="Fondo difuminado"
          className="absolute inset-0 w-full h-full object-cover blur-md opacity-30 z-0"
        />

        <div className="relative z-10 container mx-auto px-6 sm:px-4 lg:px-44">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <div className="space-y-6 lg:space-y-8 py-12">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  <FaStar className="w-4 h-4" />
                  Nuevo en la tienda
                </div>

                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Descubre la
                  <span className="text-blue-600"> Nueva Colección</span>
                </h1>

                <p className="text-lg lg:text-xl text-gray-600 max-w-lg">
                  Productos de alta calidad con diseños únicos. Encuentra todo
                  lo que necesitas para expresar tu estilo personal.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-lg flex items-center justify-center">
                  <FaShoppingBag className="w-5 h-5 mr-2" />
                  Comprar Ahora
                </button>
                <button className="border border-gray-300 text-gray-700 hover:bg-gray-100 bg-gray-50 px-8 py-3 text-lg rounded-lg">
                  Ver Catálogo
                </button>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaTruck className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">Envío gratis</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FaCircleCheck className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium">Garantía 30 días</span>
                </div>
              </div>
            </div>

            {/* Hero Image (opcional, si querés que siga viéndose en column layout) */}
            <div className="relative z-10">
              <img
                src="https://i.blogs.es/787248/puma/1366_2000.jpeg"
                alt="Hero"
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50 p-4">
        <div className="container mx-auto px-6 sm:px-4 lg:px-44">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Nuevos ingresos
            </h3>
            <p className="text-gray-600 text-lg">
              Los más nuevo de la temporada
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
        <div className="container mx-auto px-6 sm:px-4 lg:px-44">
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
    </div>
  );
}
