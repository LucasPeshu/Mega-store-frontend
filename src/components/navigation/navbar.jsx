import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verificar si existe la clave 'usuario' en el localStorage
    const user = localStorage.getItem("usuario");
    if (user) {
      // Si el usuario existe, parsea el valor y lo guarda en el estado `user`
      setUser(JSON.parse(user)); // Usamos JSON.parse para convertirlo de string a objeto
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Eliminar la clave 'usuario' del localStorage para cerrar sesión
    localStorage.removeItem("usuario");
    setIsAuthenticated(false);
    setUser(null); // Limpiar el estado de `user` al cerrar sesión
  };

  return (
    <nav className="bg-white shadow px-4 py-4 rounded fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 sm:px-4 lg:px-44 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap">
            MegaStore
          </span>
        </a>

        <div className="flex gap-4">
          <a
            href="/"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Inicio
          </a>
          <a
            href="/productos"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Productos
          </a>
          <a
            href="/carrito"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Carrito
          </a>
        </div>

        {/* Menú principal */}
        <div className="hidden lg:flex lg:items-center lg:w-auto">
          <ul className="font-medium flex space-x-6 items-center">
            {/* Contenedor relativo para posicionar el menú respecto al botón */}
            <div className="relative flex justify-center">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="inline-flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-1"
              >
                <FaUserCircle className="text-2xl text-gray-500 hover:text-gray-700 transition-colors duration-200" />
                <IoMdArrowDropdown
                  className={`text-2xl text-gray-400 transition-all duration-200 ${
                    showUserMenu ? "rotate-180 text-gray-600" : ""
                  }`}
                />
              </button>

              {showUserMenu && (
                <ul className="absolute top-full mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  {!isAuthenticated && (
                    <>
                      <li>
                        <a
                          href="/login"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-800"
                        >
                          Iniciar sesión
                        </a>
                      </li>
                      <li>
                        <a
                          href="/register"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-800"
                        >
                          Registrarse
                        </a>
                      </li>
                    </>
                  )}

                  {isAuthenticated && (
                    <>
                      <li>
                        <a
                          href="/admin/marcas"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-800"
                        >
                          Marcas
                        </a>
                      </li>
                      <li>
                        <a
                          href="/admin/productos"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-800"
                        >
                          Productos
                        </a>
                      </li>
                      <li>
                        <a
                          href="/admin/categorias"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-800"
                        >
                          Categorías
                        </a>
                      </li>
                      <li>
                        <a
                          href="/admin/subcategorias"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-800"
                        >
                          Subcategorías
                        </a>
                      </li>
                      <li>
                        <a
                          href={`/edit-profile/${user?.id}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-800"
                        >
                          Editar perfil
                        </a>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-800"
                        >
                          Cerrar sesión
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              )}
            </div>
          </ul>
        </div>

        {/* Menú hamburguesa */}
        <div className="lg:hidden flex items-center">
          {isOpen ? (
            <FaTimes className="text-xl cursor-pointer" onClick={toggleMenu} />
          ) : (
            <FaBars className="text-xl cursor-pointer" onClick={toggleMenu} />
          )}
        </div>
      </div>

      {/* Menú móvil */}
      <div className={`lg:hidden ${isOpen ? "block" : "hidden"}`}>
        <ul className="font-medium flex flex-col space-y-4 p-4">
          <li>
            <a
              href="/marcas"
              className="text-gray-900 hover:text-blue-700 transition"
            >
              Marcas
            </a>
          </li>
          <li>
            <a
              href="/productos"
              className="text-gray-900 hover:text-blue-700 transition"
            >
              Productos
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
