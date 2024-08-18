import {
  DELETED_DRIVER_LIST,
  DELETED_DRIVER_PROFILE_READ,
  DELETED_DRIVER_VIEW,
  DELETE_ACCOUNT_PERMANENTLTY,
  PERMANENT_DELETED_DRIVER_LIST,
  PERMANENT_DELETED_DRIVER_READ,
  PERMANENT_DELETED_DRIVER_VIEW,
  RESTORE_DRIVER,
} from "../types";

export const deleteDriverListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DELETED_DRIVER_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const deleteDriverViewAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DELETED_DRIVER_VIEW,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const deleteDriverProfileReadAction = (id, onError) => {
  return {
    type: DELETED_DRIVER_PROFILE_READ,
    id,
    onError,
  };
};
export const restoreDriverAction = (id, data, onSuccess, onError) => {
  return {
    type: RESTORE_DRIVER,
    id,
    data,
    onSuccess,
    onError,
  };
};
export const permDeleteDriverAction = (id, data, onSuccess, onError) => {
  return {
    type: DELETE_ACCOUNT_PERMANENTLTY,
    id,
    data,
    onSuccess,
    onError,
  };
};
export const permdeleteDriverListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: PERMANENT_DELETED_DRIVER_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const permdeleteDriverViewAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: PERMANENT_DELETED_DRIVER_VIEW,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const permdeleteDriverProfileReadAction = (id, onError) => {
  return {
    type: PERMANENT_DELETED_DRIVER_READ,
    id,
    onError,
  };
};
