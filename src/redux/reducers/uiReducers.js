import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI, STOP_LOADING } from "./types";
import { findAllByDisplayValue } from "@testing-library/react";
const initialState = {
  loading: false,
  errors: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
