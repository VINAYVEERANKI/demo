import {
  ADD_VEHICLETYPE,
  RIDETYPE_DROPDOWN,
  VEHICLETYPE_EDIT,
  VEHICLETYPE_LIST,
  VEHICLETYPE_VIEW,
  VEHICLETYPE_DROPDOWN_LIST,
} from "./types";

export const addVehicleTypeAction = (data, onSuccess, onError) => {
  return {
    type: ADD_VEHICLETYPE,
    data,
    onSuccess,
    onError,
  };
};

export const rideTypeDropDownAction = (onSuccess, onError) => {
  return {
    type: RIDETYPE_DROPDOWN,
    onSuccess,
    onError,
  };
};

export const vehicleListAction = (data, current_page, onSuccess, onError) => {
  return {
    type: VEHICLETYPE_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const vehicleTypeViewAction = (data, onSuccess, onError) => {
  return {
    type: VEHICLETYPE_VIEW,
    data,
    onSuccess,
    onError,
  };
};

export const vehicleTypeEditAction = (data, onSuccess, onError) => {
  return {
    type: VEHICLETYPE_EDIT,
    data,
    onSuccess,
    onError,
  };
};

export const vehicleTypeDropdownListAction = (onSuccess, onError) => {
  return {
    type: VEHICLETYPE_DROPDOWN_LIST,
    onSuccess,
    onError,
  };
};