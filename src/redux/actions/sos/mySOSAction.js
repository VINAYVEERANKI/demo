import {
  DRIVER_CLOSE_SOS,
  DRIVER_FORWARD_SOS,
  MY_SOS_DRIVER_LIST,
  MY_SOS_RIDER_LIST,
  DRIVER_RESOLVE_SOS,
  RIDER_CLOSE_SOS,
  RIDER_RESOLVE_SOS,
  RIDER_FORWARD_SOS,
  LOCAL_RESPONDER_CONATACT_LIST,
} from "../types";

export const mySOSDriverListAction = (data, onSuccess, onError) => {
  return {
    type: MY_SOS_DRIVER_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const mySOSRiderListAction = (data, onSuccess, onError) => {
  return {
    type: MY_SOS_RIDER_LIST,
    data,
    onSuccess,
    onError,
  };
};
export const closeSOSAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_CLOSE_SOS,
    data,
    onSuccess,
    onError,
  };
};
export const resolveSOSAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_RESOLVE_SOS,
    data,
    onSuccess,
    onError,
  };
};

export const forwardSOSAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_FORWARD_SOS,
    data,
    onSuccess,
    onError,
  };
};

export const closeRiderSOSAction = (data, onSuccess, onError) => {
  return {
    type: RIDER_CLOSE_SOS,
    data,
    onSuccess,
    onError,
  };
};
export const resolveRiderSOSAction = (data, onSuccess, onError) => {
  return {
    type: RIDER_RESOLVE_SOS,
    data,
    onSuccess,
    onError,
  };
};

export const forwardRiderSOSAction = (data, onSuccess, onError) => {
  return {
    type: RIDER_FORWARD_SOS,
    data,
    onSuccess,
    onError,
  };
};
export const localResponderConatctListAction = (data, onSuccess, onError) => {
  return {
    type: LOCAL_RESPONDER_CONATACT_LIST,
    data,
    onSuccess,
    onError,
  };
};
