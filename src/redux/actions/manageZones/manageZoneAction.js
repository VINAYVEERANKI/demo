import {
  ADD_MAIN_ZONE,
  EDIT_MAIN_ZONE,
  FIND_ALL_COORDINATES,
  MAIN_ZONE_VIEW,
  MANAGE_ZONES_DRP_DWN,
  MANAGE_ZONES_LIST,
} from "../types";

export const ManageZonesListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: MANAGE_ZONES_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const addMainZoneAction = (data, onSuccess, onError) => {
  return { type: ADD_MAIN_ZONE, data, onSuccess, onError };
};

export const mainZoneViewAction = (data, onSuccess, onError) => {
  return {
    type: MAIN_ZONE_VIEW,
    data,
    onSuccess,
    onError,
  };
};

export const findAllCoordinatesAction = (onSuccess, onError) => {
  return {
    type: FIND_ALL_COORDINATES,
    onSuccess,
    onError,
  };
};

export const editMainZoneAction = (data, onSuccess, onError) => {
  return {
    type: EDIT_MAIN_ZONE,
    data,
    onSuccess,
    onError,
  };
};

export const managezoneDrpdwnAction = (onSuccess, onError) => {
  return {
    type: MANAGE_ZONES_DRP_DWN,
    onSuccess,
    onError,
  };
};