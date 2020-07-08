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
  SUBMIT_COMMENTS,
  SET_ERRORS,
} from "../reducers/types";
import axios from "axios";

export const postDevo = (formData, image) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/devos", formData)
    .then((res) => {
      const devoId = res.data.devoId;
      const data = res.data;
      if (image !== null) {
        axios
          .post(`/devos/${devoId}`, image)
          .then((response) => {
            dispatch({
              type: POST_DEVO,
              payload: response.data,
            });
            dispatch(clearErrors());
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        dispatch({
          type: POST_DEVO,
          payload: data,
        });
        dispatch(clearErrors());
      }
    })
    .catch((err) => console.log(err));
};

// get all devos
export const getDevos = () => (dispatch) => {
  dispatch(clearErrors());
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
      console.log(res.data);
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

// submit comment.
export const postComment = (devoId, commentData) => (dispatch) => {
  axios
    .post(`/devo/comment/${devoId}`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENTS,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getUserData = (userHandle) => (dispatch) => {
  dispatch(clearErrors());
  dispatch({
    type: LOADING_DATA,
  });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      if (res.data.devos.length === 0) {
        dispatch({
          type: SET_DEVOS,
          payload: null,
        });
      } else {
        dispatch({ type: SET_DEVOS, payload: res.data.devos });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_DEVOS,
        payload: null,
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
