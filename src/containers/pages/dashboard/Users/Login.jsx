import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    contrasena: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "El email es obligatorio.";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "El email no es válido.";
    if (!formData.contrasena.trim())
      newErrors.contrasena = "La contraseña es obligatoria.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Realizar la solicitud POST a la API
        const response = await fetch(
          "http://localhost:8080/api/sesiones/iniciar-sesion",
          {
            method: "POST", // Cambiar a POST
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: formData.email.trim(),
              contrasena: formData.contrasena.trim(),
            }),
          }
        );

        if (response.ok) {
          const responseBody = await response.json();
          localStorage.setItem("usuario", JSON.stringify(responseBody));
          setSuccessMessage("Sesión iniciada con éxito.");
          // Si es necesario, redirigir a otra página después de un tiempo
          setTimeout(() => {
            window.location.href = "/"; // Redirigir al dashboard, por ejemplo
          }, 2000); // Espera 2 segundos para redirigir
        } else {
          const responseBody = await response.json();
          alert(
            responseBody.message ||
              "Error: Verifica tus credenciales e intenta nuevamente."
          );
        }
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        alert("Ocurrió un error inesperado.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white px-8 py-16 rounded-2xl shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar sesión</h2>

        {successMessage && (
          <div className="bg-green-500 text-white p-3 mb-4 text-center rounded">
            {successMessage}
          </div>
        )}

        <div className="mb-4">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Ingrese su correo electrónico"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-3 border rounded-2xl ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-4 relative">
          <input
            type={showPassword ? "text" : "password"}
            id="contrasena"
            name="contrasena"
            placeholder="Ingrese su contraseña"
            value={formData.contrasena}
            onChange={handleChange}
            className={`w-full p-3 pr-10 border rounded-2xl ${
              errors.contrasena ? "border-red-500" : "border-gray-300"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
            tabIndex={-1}
            aria-label={
              showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            {showPassword ? (
              // Ojo abierto (SVG)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            ) : (
              // Ojo cerrado (SVG)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.269-2.944-9.543-7a9.97 9.97 0 012.137-3.362M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3l18 18"
                />
              </svg>
            )}
          </button>
          {errors.contrasena && (
            <p className="text-red-500 text-sm mt-1">{errors.contrasena}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-3 rounded-2xl hover:bg-blue-700"
        >
          Iniciar sesión
        </button>

        <div className="mt-4 text-center">
          <Link to="/recoverpassword" className="text-blue-500 hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
