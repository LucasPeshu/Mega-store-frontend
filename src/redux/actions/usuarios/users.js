import axios from "axios";
import {
  GET_USUARIOS_SUCCES,
  GET_USUARIOS_FAIL,
  GET_USUARIOS_DETAIL_SUCCES,
  GET_USUARIOS_DETAIL_FAIL,
} from "./types";

export const get_usuarios = () => async (dispatch) => {
  const config = {
    headers: {
      accept: "application/json",
    },
  };

  try {
    const res = await axios.get(
      "http://localhost:8080/api/usuarios/listar"
    );
    if (res.status === 200) {
      dispatch({
        type: GET_USUARIOS_SUCCES,
        payload: res.data,
      });
    } else {
      dispatch({
        type: GET_USUARIOS_FAIL,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_USUARIOS_FAIL,
    });
  }
};

export const get_usuarios_detail = (id) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  try {
    const res = await axios.get(
      `http://localhost:8080/api/usuarios/${id}`,
      config
    );

    if (res.status === 200) {
      dispatch({
        type: GET_USUARIOS_DETAIL_SUCCES,
        payload: res.data,
      });
    } else {
      dispatch({
        type: GET_USUARIOS_DETAIL_FAIL,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_USUARIOS_DETAIL_FAIL,
    });
  }
};
