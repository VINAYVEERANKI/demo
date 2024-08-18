import {
  ADD_SOS_LOCAL_RESPNDER,
  DELETE_SOS_LOCAL_RESPONDER,
  SOS_LOCAL_RESPONDER,
  SOS_LOCAL_RESPONDER_LIST,
  UPDATE_SOS_LOCAL_RESPONDER,
} from "../types";

export const localResponderListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: SOS_LOCAL_RESPONDER_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const localResponderAction = (data, onSuccess, onError) => {
  return {
    type: SOS_LOCAL_RESPONDER,
    data,
    onSuccess,
    onError,
  };
};
export const addLocalResponderAction = (data, onSuccess, onError) => {
  return {
    type: ADD_SOS_LOCAL_RESPNDER,
    data,
    onSuccess,
    onError,
  };
};

export const localResponderUpdateAction = (data, onSuccess, onError) => {
  return {
    type: UPDATE_SOS_LOCAL_RESPONDER,
    data,
    onSuccess,
    onError,
  };
};
export const localResponderDeleteAction = (data, onSuccess, onError) => {
  return {
    type: DELETE_SOS_LOCAL_RESPONDER,
    data,
    onSuccess,
    onError,
  };
};
