import {
  ADD_RIDETYPE,
  EDIT_RIDETYPE,
  RIDETYPE_LIST,
  RIDETYPE_VIEW,
  RIDETYPE_ZONE_LIST,
  RIDETYPE_DROPDOWN_LIST,
} from "./types";

export const addRideTypeAction = (data, onSuccess, onError) => {
  return {
    type: ADD_RIDETYPE,
    data,
    onSuccess,
    onError,
  };
};

export const rideTypeZoneListAction = (onSuccess, onError) => {
  return {
    type: RIDETYPE_ZONE_LIST,
    onSuccess,
    onError,
  };
};

export const rideTypeListAction = (data, current_page, onSuccess, onError) => {
  return {
    type: RIDETYPE_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const rideTypeViewAction = (data, onSuccess, onError) => {
  return {
    type: RIDETYPE_VIEW,
    data,
    onSuccess,
    onError,
  };
};

export const editRideTypeAction = (data, onSuccess, onError) => {
  return {
    type: EDIT_RIDETYPE,
    data,
    onSuccess,
    onError,
  };
};

export const rideTypeDropdownListAction = (onSuccess, onError) => {
  return {
    type: RIDETYPE_DROPDOWN_LIST,
    onSuccess,
    onError,
  };
};

