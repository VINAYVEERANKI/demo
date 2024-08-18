import {
  CREATE_DRIVER_INCENTIVE,
  CREATE_INCENTIVE_DATA,
  DRIVER_INCENTIVE_PENDING,
  DRIVER_INCENTIVE_PENDING_EDIT,
  DRIVER_INCENTIVE_PEND_LIST,
  DRI_INCENTIVE_REVREQ_DRP_DWN,
} from "../../actions/types";

// driver

// create
export const createdriverIncentiveAction = (data, onSuccess, onError) => {
  return {
    type: CREATE_DRIVER_INCENTIVE,
    data,
    onSuccess,
    onError,
  };
};
export const driverIncentivePendingListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DRIVER_INCENTIVE_PEND_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const driverIncentivePendingAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_INCENTIVE_PENDING,
    data,
    onSuccess,
    onError,
  };
};
export const driverIncentivePendingEditAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_INCENTIVE_PENDING_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const incentiveDataAction = (data) => {
  return {
    type: CREATE_INCENTIVE_DATA,
    data,
  };
};

export const driIncentiveRevreqDrpdwnAction = (onSuccess, onError) => {
  return {
    type: DRI_INCENTIVE_REVREQ_DRP_DWN,
    onSuccess,
    onError,
  };
};

