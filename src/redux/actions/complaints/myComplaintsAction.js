import {
  DRIVER_CLOSE_COMPLAINT,
  DRIVER_FORWARD_COMPLAINT,
  MY_COMPLAINTS_LIST,
  MY_COMPLAINTS_RIDER_LIST,
  DRIVER_RESOLVE_COMPLAINT,
  RIDER_CLOSE_COMPLAINT,
  RIDER_RESOLVE_COMPLAINT,
  RIDER_FORWARD_COMPLAINT,
} from "../types";

export const myComplaintsListAction = (data, onSuccess, onError) => {
  return {
    type: MY_COMPLAINTS_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const myComplaintsRiderListAction = (data, onSuccess, onError) => {
  return {
    type: MY_COMPLAINTS_RIDER_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const closeDriverComplaintAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_CLOSE_COMPLAINT,
    data,
    onSuccess,
    onError,
  };
};
export const resolveDriverComplaintAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_RESOLVE_COMPLAINT,
    data,
    onSuccess,
    onError,
  };
};

export const forwardDriverComplaintAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_FORWARD_COMPLAINT,
    data,
    onSuccess,
    onError,
  };
};

export const closeRiderComplaintAction = (data, onSuccess, onError) => {
  return {
    type: RIDER_CLOSE_COMPLAINT,
    data,
    onSuccess,
    onError,
  };
};
export const resolveRiderComplaintAction = (data, onSuccess, onError) => {
  return {
    type: RIDER_RESOLVE_COMPLAINT,
    data,
    onSuccess,
    onError,
  };
};

export const forwardRiderComplaintAction = (data, onSuccess, onError) => {
  return {
    type: RIDER_FORWARD_COMPLAINT,
    data,
    onSuccess,
    onError,
  };
};
