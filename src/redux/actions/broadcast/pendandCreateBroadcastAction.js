import {
  CREATE_DRIVER_BROADCAST,
  CREATE_RIDER_BROADCAST,
  DRIVER_BROADCAST_APPROVE,
  DRIVER_BROADCAST_PEND_LIST,
  DRIVER_BROADCAST_REJECT,
  DRIVER_BROADCAST_REV_REQ_DRP_DWN,
  EDIT_REV_REQ_DRIVER_BROADCAST,
  EDIT_REV_REQ_RIDER_BROADCAST,
  REV_REQ_DRIVER_BROADCAST,
  REV_REQ_RIDER_BROADCAST,
  REV_REQ_RIDER_BROADCAST_DRP_DWN,
  RIDER_BROADCAST_APPROVE,
  RIDER_BROADCAST_PEND_LIST,
  RIDER_BROADCAST_REJECT,
  RIDETYPE_BROADCAST_DROPDOWN,
} from "../types";

export const riderBroadCastPendingListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: RIDER_BROADCAST_PEND_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const riderBroadCastCreateAction = (data, onSuccess, onError) => {
  return {
    type: CREATE_RIDER_BROADCAST,
    data,
    onSuccess,
    onError,
  };
};
export const reviewReqRiderBroadCastAction = (data, onSuccess, onError) => {
  return {
    type: REV_REQ_RIDER_BROADCAST,
    data,
    onSuccess,
    onError,
  };
};

export const reviewReqRiderBroadCastEditAction = (data, onSuccess, onError) => {
  return {
    type: EDIT_REV_REQ_RIDER_BROADCAST,
    data,
    onSuccess,
    onError,
  };
};

export const riderBroadCastApproveAction = (data, onSuccess, onError) => {
  return {
    type: RIDER_BROADCAST_APPROVE,
    data,
    onSuccess,
    onError,
  };
};
export const riderBroadCastRejectAction = (data, onSuccess, onError) => {
  return {
    type: RIDER_BROADCAST_REJECT,
    data,
    onSuccess,
    onError,
  };
};

export const driverBroadCastPendingListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DRIVER_BROADCAST_PEND_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const reviewReqDriverBroadCastAction = (data, onSuccess, onError) => {
  return {
    type: REV_REQ_DRIVER_BROADCAST,
    data,
    onSuccess,
    onError,
  };
};
export const driverBroadCastCreateAction = (data, onSuccess, onError) => {
  return {
    type: CREATE_DRIVER_BROADCAST,
    data,
    onSuccess,
    onError,
  };
};
export const reviewReqDriverBroadCastEditAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: EDIT_REV_REQ_DRIVER_BROADCAST,
    data,
    onSuccess,
    onError,
  };
};

export const driverBroadCastApproveAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_BROADCAST_APPROVE,
    data,
    onSuccess,
    onError,
  };
};
export const driverBroadCastRejectAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_BROADCAST_REJECT,
    data,
    onSuccess,
    onError,
  };
};

export const rideTypeBroadcastDropDownAction = (onSuccess, onError) => {
  return {
    type: RIDETYPE_BROADCAST_DROPDOWN,
    onSuccess,
    onError,
  };
};

export const rideBroadcastRevreqDrpdwnAction = (onSuccess, onError) => {
  return {
    type: REV_REQ_RIDER_BROADCAST_DRP_DWN,
    onSuccess,
    onError,
  };
};

export const driBroadcastRevreqDrpdwnAction = (onSuccess, onError) => {
  return {
    type: DRIVER_BROADCAST_REV_REQ_DRP_DWN,
    onSuccess,
    onError,
  };
};