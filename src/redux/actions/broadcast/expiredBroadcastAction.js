import {
  DRIVER_BROADCAST_EXPIRED_FIND_ONE,
  DRIVER_BROADCAST_EXPIRED_LIST,
  DRIVER_BROADCAST_EXPIRE_DRP_DWN,
  RIDER_BROADCAST_EXPIRED_DRP_DWN,
  RIDER_BROADCAST_EXPIRED_FIND_ONE,
  RIDER_BROADCAST_EXPIRED_LIST,
} from "../types";

export const riderBroadCastExpiredListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: RIDER_BROADCAST_EXPIRED_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const riderBroadCastExpiredFindOneAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: RIDER_BROADCAST_EXPIRED_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};
export const driverBroadCastExpiredListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DRIVER_BROADCAST_EXPIRED_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const driverBroadCastExpiredFindOneAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: DRIVER_BROADCAST_EXPIRED_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};

export const rideBroadcastExpiredDrpdwnAction = (onSuccess, onError) => {
  return {
    type: RIDER_BROADCAST_EXPIRED_DRP_DWN,
    onSuccess,
    onError,
  };
};

export const driBroadcastExpireDrpdwnAction = (onSuccess, onError) => {
  return {
    type: DRIVER_BROADCAST_EXPIRE_DRP_DWN,
    onSuccess,
    onError,
  };
};