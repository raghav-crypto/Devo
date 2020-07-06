import {
  SET_DEVOS,
  LOADING_DATA,
  LIKE_DEVO,
  UNLIKE_DEVO,
  DELETE_DEVO,
  POST_DEVO,
  SET_DEVO,
  SUBMIT_COMMENTS,
} from "../reducers/types";
const initialState = {
  devos: [],
  devo: {},
  loading: false,
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_DEVOS:
      return {
        ...state,
        devos: payload,
        loading: false,
      };
    case SET_DEVO:
      return {
        ...state,
        devo: payload,
        loading: false,
      };
    case LIKE_DEVO:
    case UNLIKE_DEVO:
      let indx = state.devos.findIndex(
        (devo) => devo.devoId === payload.devoId
      );
      state.devos[indx] = payload;
      if (state.devo.devoId === payload.devoId) {
        state.devo = payload;
      }
      return {
        ...state,
      };
    case DELETE_DEVO:
      let index = state.devos.findIndex((devo) => devo.devoId === payload);
      state.devos.splice(index, 1);
      return {
        ...state,
      };
    case POST_DEVO:
      return {
        ...state,
        devos: [payload, ...state.devos],
        loading: false,
      };
    case SUBMIT_COMMENTS:
      return {
        ...state,
        devo: {
          ...state.devo,
          comments: [payload, ...state.devo.comments],
        },
      };
    default:
      return state;
  }
}
