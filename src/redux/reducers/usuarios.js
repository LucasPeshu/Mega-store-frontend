import {
  GET_USUARIOS_SUCCES,
  GET_USUARIOS_FAIL,
  GET_USUARIOS_DETAIL_SUCCES,
  GET_USUARIOS_DETAIL_FAIL,
} from "../actions/usuarios/types";

const initialState = {
  usuario: null,
  usuarios: null
};

export default function usuarios(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USUARIOS_SUCCES:
      return {
        ...state,
        usuarios: payload
      };
    case GET_USUARIOS_FAIL:
      return {
        ...state,
        usuarios: null
      };
    default:
      return state;
    case GET_USUARIOS_DETAIL_SUCCES:
      return {
        ...state,
        usuario: payload
      };
    case GET_USUARIOS_DETAIL_FAIL:
      return {
        ...state,
        usuario: null
      };
  }
}