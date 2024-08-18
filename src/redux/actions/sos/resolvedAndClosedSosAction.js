import {
  DRIVER_RESOLVED_CLOSED_SOS_LIST,
  DRIVER_RES_COLSED_SOS,
  RIDER_RESOLVED_CLOSED_SOS_LIST,
  RIDER_RES_COLSED_SOS,
} from "../types";

export const riderResolvedClosedSOSListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: RIDER_RESOLVED_CLOSED_SOS_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const driverResolvedClosedSOSListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DRIVER_RESOLVED_CLOSED_SOS_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const riderResClosedSOSAction = (data, onSuccess, onError) => {
  return {
    type: RIDER_RES_COLSED_SOS,
    data,
    onSuccess,
    onError,
  };
};

export const driverResColsedSOSAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_RES_COLSED_SOS,
    data,
    onSuccess,
    onError,
  };
};