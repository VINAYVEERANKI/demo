import {
  DELETE_DRIVER_BROADCAST,
  DELETE_RIDER_BROADCAST,
  DRIVER_BROADCAST_DELETED_LIST,
  DRIVER_BROADCAST_DELETE_DRP_DWN,
  DRIVER_BROADCAST_DELETE_FIND_ONE,
  RIDER_BROADCAST_DELETED_LIST,
  RIDER_BROADCAST_DELETE_DRP_DWN,
  RIDER_BROADCAST_DELETE_FIND_ONE,
} from "../types";

export const riderBroadCastDeleteListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: RIDER_BROADCAST_DELETED_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const riderBroadCastDeleteAction = (data, onSuccess, onError) => {
  return {
    type: DELETE_RIDER_BROADCAST,
    data,
    onSuccess,
    onError,
  };
};
export const riderBroadCastDeleteFindOneAction = (data, onSuccess, onError) => {
  return {
    type: RIDER_BROADCAST_DELETE_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};

export const driverBroadCastDeleteListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DRIVER_BROADCAST_DELETED_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const driverBroadCastDeleteAction = (data, onSuccess, onError) => {
  return {
    type: DELETE_DRIVER_BROADCAST,
    data,
    onSuccess,
    onError,
  };
};

export const driverBroadCastDeleteFindOneAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_BROADCAST_DELETE_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};

export const rideBroadcastDeleteDrpdwnAction = (onSuccess, onError) => {
  return {
    type: RIDER_BROADCAST_DELETE_DRP_DWN,
    onSuccess,
    onError,
  };
};

export const driBroadcastDeleteDrpdwnAction = (onSuccess, onError) => {
  return {
    type: DRIVER_BROADCAST_DELETE_DRP_DWN,
    onSuccess,
    onError,
  };
};