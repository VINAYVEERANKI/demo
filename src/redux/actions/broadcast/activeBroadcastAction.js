import {
  DRIVER_BROADCAST_ACTIVE_DRP_DWN,
  DRIVER_BROADCAST_ACTIVE_EDIT,
  DRIVER_BROADCAST_ACTIVE_FIND_ONE,
  DRIVER_BROADCAST_ACTIVE_LIST,
  RIDER_BROADCAST_ACTIVE_DRP_DWN,
  RIDER_BROADCAST_ACTIVE_EDIT,
  RIDER_BROADCAST_ACTIVE_FIND_ONE,
  RIDER_BROADCAST_ACTIVE_LIST,
} from "../types";

export const riderBroadCastActiveListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: RIDER_BROADCAST_ACTIVE_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const activeRiderBroadCastFindOneAction = (data, onSuccess, onError) => {
  return {
    type: RIDER_BROADCAST_ACTIVE_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};
export const activeRiderBroadCastEditAction = (data, onSuccess, onError) => {
  return {
    type: RIDER_BROADCAST_ACTIVE_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const driverBroadCastActiveListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DRIVER_BROADCAST_ACTIVE_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const activeDriverBroadCastFindOneAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: DRIVER_BROADCAST_ACTIVE_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};
export const activeDriverBroadCastEditAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_BROADCAST_ACTIVE_EDIT,
    data,
    onSuccess,
    onError,
  };
};


export const rideBroadcastActiveDrpdwnAction = (onSuccess, onError) => {
  return {
    type: RIDER_BROADCAST_ACTIVE_DRP_DWN,
    onSuccess,
    onError,
  };
};

export const driBroadcastActiveDrpdwnAction = (onSuccess, onError) => {
  return {
    type: DRIVER_BROADCAST_ACTIVE_DRP_DWN,
    onSuccess,
    onError,
  };
};
