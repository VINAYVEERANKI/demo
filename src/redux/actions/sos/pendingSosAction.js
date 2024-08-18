import {
  DRIVER_SOS_ASSIGN,
  DRIVER_SOS_INITIATE,
  DRIVER_PENDING_SOS,
  DRIVER_PENDING_SOS_LIST,
  RIDER_SOS_ASSIGN,
  RIDER_SOS_INITIATE,
  RIDER_PENDING_SOS,
  RIDER_PENDING_SOS_LIST,
  GENERATE_SOS_CALL_RIDER,
  GENERATE_SOS_CALL_DRIVER,
  ASSIGN_SOS_TO_ADMIN_LIST,
  RIDER_SOS_PENDING_DROPDOWN,
  DRIVER_SOS_PENDING_DROPDOWN,
} from "../types";

export const riderPendSOSListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: RIDER_PENDING_SOS_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const driverPendSOSListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DRIVER_PENDING_SOS_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const riderPendingSOSAction = (data, onSuccess, onError) => {
  return {
    type: RIDER_PENDING_SOS,
    data,
    onSuccess,
    onError,
  };
};

export const driverPendingSOSAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_PENDING_SOS,
    data,
    onSuccess,
    onError,
  };
};

export const driverSOSInitiateAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_SOS_INITIATE,
    data,
    onSuccess,
    onError,
  };
};
export const riderSOSInitiateAction = (data, onSuccess, onError) => {
  return {
    type: RIDER_SOS_INITIATE,
    data,
    onSuccess,
    onError,
  };
};

export const driverSOSAssignAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_SOS_ASSIGN,
    data,
    onSuccess,
    onError,
  };
};
export const riderSOSAssignAction = (data, onSuccess, onError) => {
  return {
    type: RIDER_SOS_ASSIGN,
    data,
    onSuccess,
    onError,
  };
};
export const generateSosCallRiderAction = (data, onSuccess, onError) => {
  return {
    type: GENERATE_SOS_CALL_RIDER,
    data,
    onSuccess,
    onError,
  };
};
export const generateSosCallDriverAction = (data, onSuccess, onError) => {
  return {
    type: GENERATE_SOS_CALL_DRIVER,
    data,
    onSuccess,
    onError,
  };
};
export const assignSosToAdminListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: ASSIGN_SOS_TO_ADMIN_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const riderSOSPendingDropDownAction = ( onSuccess, onError) => {
  return {
    type: RIDER_SOS_PENDING_DROPDOWN,
    onSuccess,
    onError,
  };
};
export const driverSOSPendingDropDownAction = ( onSuccess, onError) => {
  return {
    type: DRIVER_SOS_PENDING_DROPDOWN,
    onSuccess,
    onError,
  };
};