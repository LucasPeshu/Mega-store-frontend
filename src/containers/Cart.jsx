import { useEffect, useState } from "react";
import { FiTrash2, FiPlus, FiMinus, FiShoppingCart } from "react-icons/fi";

export function Cart() {
  const [cartItems, setCartItems] = useState(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (!carritoGuardado) return [];

    try {
      const items = JSON.parse(carritoGuardado);
      return items.map((item) => {
        const quantity = item.cantidad ?? item.quantity ?? 1;
        const stock = item.stock ?? 0;
        return {
          id: item.id,
          name: item.nombre || item.name || "Producto",
          price: item.precioUnitario ?? item.price ?? 0,
          quantity: quantity > stock ? stock : quantity, // Limita la cantidad al stock
          stock: stock,
          image: item.urlImagen || item.image || "/placeholder.svg",
          color: item.color ?? "",
          tamano: item.tamano ?? "",
        };
      });
    } catch (e) {
      console.error("Error al leer carrito:", e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (id, newQuantity) => {
    setCartItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          // Limitar la cantidad al stock
          const limitedQuantity =
            newQuantity > item.stock ? item.stock : newQuantity;
          if (limitedQuantity < 1) return item; // No dejar menos de 1
          return { ...item, quantity: limitedQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen container mx-auto px-6 sm:px-4 lg:px-48 py-16 mt-12">
      <div className="">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3">
            <FiShoppingCart className="text-2xl text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Carrito de Compras
            </h1>
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
              {totalItems} {totalItems === 1 ? "artículo" : "artículos"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de productos */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Productos en tu carrito
                </h2>
              </div>

              {cartItems.length === 0 ? (
                <div className="p-8 text-center">
                  <FiShoppingCart className="mx-auto text-4xl text-gray-400 mb-4" />
                  <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Agrega algunos productos para comenzar
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-medium text-gray-900 truncate">
                            {item.name}
                          </h3>
                          <p className="text-xl font-semibold text-blue-600 mt-1">
                            ${item.price?.toFixed(2) ?? "N/A"}
                          </p>
                          <p className="text-sm text-gray-500">
                            Stock máximo: {item.stock}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="p-2 hover:bg-gray-100 transition-colors rounded-l-lg"
                              disabled={item.quantity <= 1}
                            >
                              <FiMinus
                                className={`text-sm ${
                                  item.quantity <= 1
                                    ? "text-gray-400"
                                    : "text-gray-600"
                                }`}
                              />
                            </button>
                            <span className="px-4 py-2 text-center min-w-[3rem] font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="p-2 hover:bg-gray-100 transition-colors rounded-r-lg"
                            >
                              <FiPlus className="text-sm text-gray-600" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Eliminar producto"
                          >
                            <FiTrash2 className="text-lg" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          Subtotal: {item.quantity} × $
                          {item.price?.toFixed(2) ?? "N/A"}
                        </span>
                        <span className="text-lg font-semibold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm sticky top-8">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Resumen del pedido
                </h2>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Subtotal ({totalItems} artículos)
                    </span>
                    <span className="font-medium">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Envío</span>
                    <span className="font-medium text-green-600">Gratis</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <button
                    disabled={cartItems.length === 0}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Proceder al pago
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                    <a href="/productos">Continuar comprando</a>
                  </button>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>✓ Envío gratis en pedidos superiores a $50</p>
                    <p>✓ Devoluciones gratuitas en 30 días</p>
                    <p>✓ Garantía de satisfacción 100%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
