import {
  ADD_OUTSTATION_ZONES,
  DELETE_OUTSTATION_ZONES,
  OUTSTATION_ZONE_LIST,
  OUTSTATION_ZONE_VIEW,
  UPDATE_OUTSTATION_ZONES,
} from "../types";

export const outstationZonesListAction = (id, onSuccess, onError) => {
  return {
    type: OUTSTATION_ZONE_LIST,
    id,
    onSuccess,
    onError,
  };
};

export const addOutstationZoneAction = (data, onSuccess, onError) => {
  return { type: ADD_OUTSTATION_ZONES, data, onSuccess, onError };
};

export const outstationZonesView = (data, onSuccess, onError) => {
  return {
    type: OUTSTATION_ZONE_VIEW,
    data,
    onSuccess,
    onError,
  };
};
export const updateOutstationZoneAction = (data, onSuccess, onError) => {
  return { type: UPDATE_OUTSTATION_ZONES, data, onSuccess, onError };
};
export const deleteOutstationZoneAction = (data, onSuccess, onError) => {
  return { type: DELETE_OUTSTATION_ZONES, data, onSuccess, onError };
};
