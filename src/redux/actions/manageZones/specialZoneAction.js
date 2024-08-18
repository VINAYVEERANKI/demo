import {
    ADD_SPECIAL_ZONES,
    DELETE_SPECIAL_ZONES,
    SPECIAL_ZONE_LIST,
    SPECIAL_ZONE_VIEW,
    UPDATE_SPECIAL_ZONES,
  } from "../types";
  
  export const specialZonesListAction = (
    data,
    onSuccess,
    onError
  ) => {
    return {
      type: SPECIAL_ZONE_LIST,
      data,
      onSuccess,
      onError,
    };
  };
  
  export const addSpecialZoneAction = (data, onSuccess, onError) => {
    return { type: ADD_SPECIAL_ZONES, data, onSuccess, onError };
  };
  
  export const specialZonesView = (data, onSuccess, onError) => {
    return {
      type: SPECIAL_ZONE_VIEW,
      data,
      onSuccess,
      onError,
    };
  };
  export const updateSpecialZoneAction = (data, onSuccess, onError) => {
    return { type: UPDATE_SPECIAL_ZONES, data, onSuccess, onError };
  };
  export const deleteSpecialZoneAction = (data, onSuccess, onError) => {
    return { type: DELETE_SPECIAL_ZONES, data, onSuccess, onError };
  };
  