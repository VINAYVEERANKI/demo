import {
  DRIVER_BROADCAST_REJECT_DRP_DWN,
  DRIVER_BROADCAST_REJECT_FIND_ONE,
  DRIVER_BROADCAST_REJECT_LIST,
  RIDER_BROADCAST_REJECT_DRP_DWN,
  RIDER_BROADCAST_REJECT_FIND_ONE,
  RIDER_BROADCAST_REJECT_LIST,
} from "../types";

export const riderBroadCastRejectListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: RIDER_BROADCAST_REJECT_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const riderBroadCastRejectFindOneAction = (data, onSuccess, onError) => {
  return {
    type: RIDER_BROADCAST_REJECT_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};
export const driverBroadCastRejectListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DRIVER_BROADCAST_REJECT_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const driverBroadCastRejectFindOneAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_BROADCAST_REJECT_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};

export const rideBroadcastRejectDrpdwnAction = (onSuccess, onError) => {
  return {
    type: RIDER_BROADCAST_REJECT_DRP_DWN,
    onSuccess,
    onError,
  };
};

export const driBroadcastRejectDrpdwnAction = (onSuccess, onError) => {
  return {
    type: DRIVER_BROADCAST_REJECT_DRP_DWN,
    onSuccess,
    onError,
  };
};
