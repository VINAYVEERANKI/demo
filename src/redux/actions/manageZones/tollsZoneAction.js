import {
    ADD_TOLLS_ZONES,
    DELETE_TOLLS_ZONES,
    TOLLS_ZONE_LIST,
    TOLLS_ZONE_VIEW,
    UPDATE_TOLLS_ZONES,
  } from "../types";
  
  export const tollZonesListAction = (
    data,
    onSuccess,
    onError
  ) => {
    return {
      type: TOLLS_ZONE_LIST,
      data,
      onSuccess,
      onError,
    };
  };
  
  export const addTollZoneAction = (data, onSuccess, onError) => {
    return { type: ADD_TOLLS_ZONES, data, onSuccess, onError };
  };
  
  export const tollZonesView = (data, onSuccess, onError) => {
    return {
      type: TOLLS_ZONE_VIEW,
      data,
      onSuccess,
      onError,
    };
  };
  export const updateTollZoneAction = (data, onSuccess, onError) => {
    return { type: UPDATE_TOLLS_ZONES, data, onSuccess, onError };
  };
  export const deleteTollZoneAction = (data, onSuccess, onError) => {
    return { type: DELETE_TOLLS_ZONES, data, onSuccess, onError };
  };