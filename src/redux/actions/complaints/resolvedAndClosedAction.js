import {
  DRIVER_COMPL_RESLOVED_DROPDOWN,
  DRIVER_RESOLVED_CLOSED_COMPLAINTS_LIST,
  DRIVER_RES_COLSED_COMPLAINT,
  RIDER_COMPL_RESLOVED_DROPDOWN,
  RIDER_RESOLVED_CLOSED_COMPLAINTS_LIST,
  RIDER_RES_COLSED_COMPLAINT,
} from "../types";

export const riderResolvedClosedComplaintsListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: RIDER_RESOLVED_CLOSED_COMPLAINTS_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const driverResolvedClosedComplaintsListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DRIVER_RESOLVED_CLOSED_COMPLAINTS_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const riderResClosedComplaintAction = (data, onSuccess, onError) => {
  return {
    type: RIDER_RES_COLSED_COMPLAINT,
    data,
    onSuccess,
    onError,
  };
};

export const driverResColsedComplaintAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_RES_COLSED_COMPLAINT,
    data,
    onSuccess,
    onError,
  };
};
export const riderComplReslovedDropDownAction = ( onSuccess, onError) => {
  return {
    type: RIDER_COMPL_RESLOVED_DROPDOWN,
    onSuccess,
    onError,
  };
};
export const driverComplReslovedDropDownAction = ( onSuccess, onError) => {
  return {
    type: DRIVER_COMPL_RESLOVED_DROPDOWN,
    onSuccess,
    onError,
  };
};