import {
  DELETE_DRIVER_INCENTIVE,
  DRIVER_INCENTIVE_DELETED,
  DRIVER_INCENTIVE_DELETED_LIST,
  DRI_INCENTIVE_DELETE_DRP_DWN,
} from "../types";

// driver
export const driverIncentiveDeletedListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DRIVER_INCENTIVE_DELETED_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const driverIncentiveDeletedAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_INCENTIVE_DELETED,
    data,
    onSuccess,
    onError,
  };
};
// reject
export const deleteDriverIncentiveAction = (data, onSuccess, onError) => {
  return {
    type: DELETE_DRIVER_INCENTIVE,
    data,
    onSuccess,
    onError,
  };
};

export const driIncentiveDeleteDrpdwnAction = (onSuccess, onError) => {
  return {
    type: DRI_INCENTIVE_DELETE_DRP_DWN,
    onSuccess,
    onError,
  };
};
