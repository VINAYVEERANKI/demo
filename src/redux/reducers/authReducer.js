import {
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_LOADING,
  ADMIN_LOGIN_SUCCESS,
} from "../actions/returnTypes";
import { ADMIN_LOGOUT } from "../actions/types";
import { loginStateData } from "../constants";
import { ADMIN_DETAILS } from "../config";

export const authReducer = (state = loginStateData, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
        token: "",
      };

    case ADMIN_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        message: action.message,
        token: "",
      };
    case ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        token: action.token,
        message: action.message,
      };

    case ADMIN_LOGOUT:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        token: "",
        email: ADMIN_DETAILS.email,
        message: "",
        loggedIn: ADMIN_DETAILS.accessToken,
      };
    default:
      return state;
  }
};
