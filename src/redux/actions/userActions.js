import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
} from "../reducers/types";
import axios from "axios";

// LogIn
export const loginUser = (userData, history) => (dispatch) => {
  dispatch({
    type: LOADING_UI,
  });
  axios
    .post("/login", userData)
    .then((res) => {
      setAuthHeader(res.data.token);
      dispatch(getUserData());
      dispatch({
        type: CLEAR_ERRORS,
      });
      history.push("/");
    })
    .catch((err) => {
      console.log(`Error : ${err.response.data}`);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
// Logout
export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({
    type: SET_UNAUTHENTICATED,
  });
};
export const registerUser = (userData, history) => (dispatch) => {
  dispatch({
    type: LOADING_UI,
  });
  axios
    .post("/register", userData)
    .then((res) => {
      setAuthHeader(res.data.token);
      dispatch(getUserData());
      dispatch({
        type: CLEAR_ERRORS,
      });
      history.push("/");
    })
    .catch((err) => {
      console.log(`Error : ${err.response.data}`);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// GetUserData
export const getUserData = () => (dispatch) => {
  dispatch({
    type: LOADING_USER,
  });
  axios
    .get("/user")
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// UploadImage
export const uploadImage = (formData) => (dispatch) => {
  dispatch({
    type: LOADING_USER,
  });
  axios
    .post("/user/image", formData)
    .then((res) => {
      dispatch(getUserData());
    })
    .catch((err) => {
      console.log(err);
    });
};

// Set User Details
export const setUserDetails = (formData) => (dispatch) => {
  dispatch({
    type: LOADING_USER
  })
  axios.post('/user', formData)
  .then(res => {
    dispatch(getUserData())
  }).catch(err => {
    console.log(err)
  })
}


const setAuthHeader = (authToken) => {
  const token = `Bearer ${authToken}`;
  localStorage.setItem("token", token);
  axios.defaults.headers.common["Authorization"] = token;
};
