import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { get_usuarios_detail } from "../../../../redux/actions/usuarios/users";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditProfile = ({ get_usuarios_detail, usuario }) => {
  const params = useParams();
  const id = params.id;

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    get_usuarios_detail(id);
  }, [get_usuarios_detail, id]);

  useEffect(() => {
    if (usuario) {
      setNombre(usuario.nombre);
      setApellido(usuario.apellido);
      setEmail(usuario.email);
      setTelefono(usuario.telefono || "");
      setContrasena(usuario.contrasena || "");
    }
  }, [usuario]);

  const onSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:8080/api/usuarios/actualizar_datos/${id}`,
        {
          nombre,
          apellido,
          telefono,
          email,
          contrasena,
        }
      );
      setShowModalSuccess(true);
    } catch (err) {
      setErrorMessage("Error al actualizar el usuario.");
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
    <div className="flex justify-center items-center min-h-screen mt-12">
      <form
        onSubmit={onSubmitUpdate}
        className="space-y-4 bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h1 className="text-4xl text-center font-bold mb-4">Editar Perfil</h1>
        <div>
          <label className="block text-sm font-medium">Nombre</label>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full p-3 border rounded-2xl"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Apellido</label>
          <input
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            className="w-full p-3 border rounded-2xl"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-2xl"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Teléfono</label>
          <input
            type="text"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="w-full p-3 border rounded-2xl"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Contraseña</label>
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className="w-full p-3 border rounded-2xl"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-2xl"
        >
          Actualizar Perfil
        </button>
      </form>

      {showModalSuccess && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold">Éxito</h2>
            <p>El perfil se ha actualizado correctamente.</p>
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
  usuario: state.usuarios.usuario, // Asegúrate de que "usuario" esté bien definido en el estado global
});

export default connect(mapStateToProps, {
  get_usuarios_detail,
})(EditProfile);
