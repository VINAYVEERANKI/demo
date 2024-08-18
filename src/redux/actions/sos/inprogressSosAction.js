import {
  DRIVER_ID_LIST,
  DRIVER_INPROGRESS_SOS,
  DRIVER_INPROGRESS_SOS_LIST,
  DRIVER_INPROG_SOS_REASSIGN,
  DRIVER_REF_EXPIRED_ID_LIST,
  DRIVER_SOS_INPROGRESS_DROPDOWN,
  RIDER_ID_LIST,
  RIDER_INPROGRESS_SOS,
  RIDER_INPROGRESS_SOS_LIST,
  RIDER_INPROG_SOS_REASSIGN,
  RIDER_SOS_INPROGRESS_DROPDOWN,
} from "../types";

export const riderInprogressSOSListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: RIDER_INPROGRESS_SOS_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const driverInprogressSOSListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DRIVER_INPROGRESS_SOS_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const riderInprogressSOSAction = (data, onSuccess, onError) => {
  return {
    type: RIDER_INPROGRESS_SOS,
    data,
    onSuccess,
    onError,
  };
};
export const driverInprogressSOSAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_INPROGRESS_SOS,
    data,
    onSuccess,
    onError,
  };
};

export const driverInProgSOSReAssignAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_INPROG_SOS_REASSIGN,
    data,
    onSuccess,
    onError,
  };
};
// no api
export const riderInProgSOSReAssignAction = (data, onSuccess, onError) => {
  return {
    type: RIDER_INPROG_SOS_REASSIGN,
    data,
    onSuccess,
    onError,
  };
};

export const riderIDListAction = (onSuccess, onError) => {
  return {
    type: RIDER_ID_LIST,
    onSuccess,
    onError,
  };
};

export const driverIDListAction = (onSuccess, onError) => {
  return {
    type: DRIVER_ID_LIST,
    onSuccess,
    onError,
  };
};

export const riderSOSInprogressDropDownAction = (onSuccess, onError) => {
  return {
    type: RIDER_SOS_INPROGRESS_DROPDOWN,
    onSuccess,
    onError,
  };
};
export const driverSOSInprogressDropDownAction = (onSuccess, onError) => {
  return {
    type: DRIVER_SOS_INPROGRESS_DROPDOWN,
    onSuccess,
    onError,
  };
};
