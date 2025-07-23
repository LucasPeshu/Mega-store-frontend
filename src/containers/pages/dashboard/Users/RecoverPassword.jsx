import React, { useState } from "react";
import axios from "axios";

const RecoverPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reseteamos el mensaje antes de enviar

    try {
      // Realizamos la solicitud PUT
      await axios.put(
        "http://localhost:8080/api/sesiones/Recuperar-contrasena",
        { email }
      );
      setMessage(
        "Contraseña restablecida con éxito. La nueva contraseña es '1234'."
      );
      setEmail(""); // Limpiamos el campo de correo
    } catch (error) {
      setMessage("Error: Revise el correo ingresado.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Recuperar Contraseña
        </h2>

        <div className="mb-4">
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Ingrese su correo electrónico"
            className="w-full p-2 border rounded-2xl border-gray-300"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-2xl hover:bg-blue-700"
        >
          Restablecer Contraseña
        </button>

        {message && (
          <p
            className={`text-sm mt-4 text-center ${
              message.startsWith("Error") ? "text-red-500" : "text-green-500"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default RecoverPassword;
