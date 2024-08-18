import { ADMIN_LOGIN, ADMIN_LOGOUT, RESET_ADMIN_PASSWORD, RESET_LOGOUT_ADMIN_PASSWORD } from "./types";

export const login = (username, password, onSuccess, onError) => {
  return {
    type: ADMIN_LOGIN,
    username,
    password,
    onSuccess,
    onError,
  };
};

export const logout = (onSuccess, onError) => {
  return {
    type: ADMIN_LOGOUT,
    onSuccess,
    onError,
  };
};

export const resetPasswordAction = (data, onSuccess, onError) => {
  return {
    type: RESET_ADMIN_PASSWORD,
    data,
    onSuccess,
    onError,
  };
};

export const resetLogoutPasswordAction = (data, onSuccess, onError) => {
  return {
    type: RESET_LOGOUT_ADMIN_PASSWORD,
    data,
    onSuccess,
    onError,
  };
};