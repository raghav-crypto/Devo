import {
  SET_DEVOS,
  LOADING_DATA,
  LIKE_DEVO,
  UNLIKE_DEVO,
  DELETE_DEVO,
  CLEAR_ERRORS,
  LOADING_UI,
  POST_DEVO,
  STOP_LOADING,
  SET_DEVO,
} from "../reducers/types";
import axios from "axios";

// get all devos
export const getDevos = () => (dispatch) => {
  dispatch({
    type: LOADING_DATA,
  });
  axios
    .get("/devos")
    .then((res) => {
      dispatch({
        type: SET_DEVOS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_DEVOS,
        payload: [],
      });
    });
};

// Like a devo
export const likeDevo = (devoId) => (dispatch) => {
  axios
    .get(`/devo/${devoId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_DEVO,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// Unlike a devo
export const unlikeDevo = (devoId) => (dispatch) => {
  axios
    .get(`/devo/${devoId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_DEVO,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const deleteDevo = (devoId) => (dispatch) => {
  axios
    .delete(`/devo/${devoId}/delete`)
    .then(() => {
      dispatch({
        type: DELETE_DEVO,
        payload: devoId,
      });
    })
    .catch((err) => console.log(err));
};
export const postDevo = (body) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/devos", body)
    .then((res) => {
      dispatch({
        type: POST_DEVO,
        payload: res.data,
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => console.log(err));
};

export const getDevo = (devoId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/devo/${devoId}`)
    .then((res) => {
      dispatch({
        type: SET_DEVO,
        payload: res.data,
      });
      dispatch({
        type: STOP_LOADING,
      });
    })
    .catch((err) => console.log(err));
};
