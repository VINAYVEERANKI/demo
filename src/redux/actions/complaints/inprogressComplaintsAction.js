import {
  BOOKING_ID_LIST,
  DRIVER_COMPL_INPROGRESS_DROPDOWN,
  DRIVER_INPROGRESS_COMPLAINT,
  DRIVER_INPROGRESS_COMPLAINTS_LIST,
  DRIVER_INPROG_COMPLAINT_REASSIGN,
  RIDER_COMPL_INPROGRESS_DROPDOWN,
  RIDER_INPROGRESS_COMPLAINT,
  RIDER_INPROGRESS_COMPLAINTS_LIST,
  RIDER_INPROG_COMPLAINT_REASSIGN,
} from "../types";

export const riderInprogressComplaintsListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: RIDER_INPROGRESS_COMPLAINTS_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const driverInprogressComplaintsListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DRIVER_INPROGRESS_COMPLAINTS_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const riderInprogressComplaintAction = (data, onSuccess, onError) => {
  return {
    type: RIDER_INPROGRESS_COMPLAINT,
    data,
    onSuccess,
    onError,
  };
};
export const driverInprogressComplaintAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_INPROGRESS_COMPLAINT,
    data,
    onSuccess,
    onError,
  };
};

export const driverInProgCompReAssignAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_INPROG_COMPLAINT_REASSIGN,
    data,
    onSuccess,
    onError,
  };
};
export const riderInProgCompReAssignAction = (data, onSuccess, onError) => {
  return {
    type: RIDER_INPROG_COMPLAINT_REASSIGN,
    data,
    onSuccess,
    onError,
  };
};
export const bookingIDListAction = (onSuccess, onError) => {
  return {
    type: BOOKING_ID_LIST,
    onSuccess,
    onError,
  };
};

export const riderComplInprogressDropDownAction = (onSuccess, onError) => {
  return {
    type: RIDER_COMPL_INPROGRESS_DROPDOWN,
    onSuccess,
    onError,
  };
};
export const driverComplInprogressDropDownAction = (onSuccess, onError) => {
  return {
    type: DRIVER_COMPL_INPROGRESS_DROPDOWN,
    onSuccess,
    onError,
  };
};
