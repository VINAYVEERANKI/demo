import {
  REJECT_DRIVER_INCENTIVE,
  DRIVER_INCENTIVE_REJECTED,
  DRIVER_INCENTIVE_REJECTED_LIST,
  DRI_INCENTIVE_REJECT_DRP_DWN,
} from "../types";

// driver
export const driverIncentiveRejectedListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DRIVER_INCENTIVE_REJECTED_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const driverIncentiveRejectedAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_INCENTIVE_REJECTED,
    data,
    onSuccess,
    onError,
  };
};
// reject
export const rejectDriverIncentiveAction = (data, onSuccess, onError) => {
  return {
    type: REJECT_DRIVER_INCENTIVE,
    data,
    onSuccess,
    onError,
  };
};

export const driIncentiveRejectDrpdwnAction = (onSuccess, onError) => {
  return {
    type: DRI_INCENTIVE_REJECT_DRP_DWN,
    onSuccess,
    onError,
  };
};