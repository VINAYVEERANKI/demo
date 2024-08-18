import {
  ADD_LOCAL_ZONES,
  DELETE_LOCAL_ZONES,
  LOCAL_ZONE_LIST,
  LOCAL_ZONE_VIEW,
  UPDATE_LOCAL_ZONES,
} from "../types";

export const localZonesListAction = (id, onSuccess, onError) => {
  return {
    type: LOCAL_ZONE_LIST,
    id,
    onSuccess,
    onError,
  };
};

export const addLocalZoneAction = (data, onSuccess, onError) => {
  return { type: ADD_LOCAL_ZONES, data, onSuccess, onError };
};

export const localZonesView = (data, onSuccess, onError) => {
  return {
    type: LOCAL_ZONE_VIEW,
    data,
    onSuccess,
    onError,
  };
};
export const updateLocalZoneAction = (data, onSuccess, onError) => {
  return { type: UPDATE_LOCAL_ZONES, data, onSuccess, onError };
};
export const deleteLocalZoneAction = (data, onSuccess, onError) => {
  return { type: DELETE_LOCAL_ZONES, data, onSuccess, onError };
};
