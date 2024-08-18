import {
  ASSIGN_TO_ADMIN_LIST,
  DRIVER_COMPLAINT_ASSIGN,
  DRIVER_COMPLAINT_INITIATE,
  DRIVER_COMPL_PENDING_DROPDOWN,
  DRIVER_PENDING_COMPLAINT,
  DRIVER_PENDING_COMPLAINTS_LIST,
  RIDER_COMPLAINT_ASSIGN,
  RIDER_COMPLAINT_INITIATE,
  RIDER_COMPL_PENDING_DROPDOWN,
  RIDER_PENDING_COMPLAINT,
  RIDER_PENDING_COMPLAINTS_LIST,
} from "../types";

export const riderPendComplaintsListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: RIDER_PENDING_COMPLAINTS_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const driverPendComplaintsListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DRIVER_PENDING_COMPLAINTS_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const riderPendingComplaintAction = (data, onSuccess, onError) => {
  return {
    type: RIDER_PENDING_COMPLAINT,
    data,
    onSuccess,
    onError,
  };
};

export const driverPendingComplaintAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_PENDING_COMPLAINT,
    data,
    onSuccess,
    onError,
  };
};

export const driverCompInitiateAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_COMPLAINT_INITIATE,
    data,
    onSuccess,
    onError,
  };
};
export const riderCompInitiateAction = (data, onSuccess, onError) => {
  return {
    type: RIDER_COMPLAINT_INITIATE,
    data,
    onSuccess,
    onError,
  };
};

export const driverCompAssignAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_COMPLAINT_ASSIGN,
    data,
    onSuccess,
    onError,
  };
};
export const riderCompAssignAction = (data, onSuccess, onError) => {
  return {
    type: RIDER_COMPLAINT_ASSIGN,
    data,
    onSuccess,
    onError,
  };
};

export const assignToAdminListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: ASSIGN_TO_ADMIN_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const riderComplPendingDropDownAction = ( onSuccess, onError) => {
  return {
    type: RIDER_COMPL_PENDING_DROPDOWN,
    onSuccess,
    onError,
  };
};
export const driverComplPendingDropDownAction = ( onSuccess, onError) => {
  return {
    type: DRIVER_COMPL_PENDING_DROPDOWN,
    onSuccess,
    onError,
  };
};