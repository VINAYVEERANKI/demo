import {
  DRIVER_INCENTIVE_EXPIRED,
  DRIVER_INCENTIVE_EXPIRED_LIST,
  DRI_INCENTIVE_EXPIRE_DRP_DWN,
} from "../types";

// driver
export const driverIncentiveExpiredListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DRIVER_INCENTIVE_EXPIRED_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const driverIncentiveExpiredAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_INCENTIVE_EXPIRED,
    data,
    onSuccess,
    onError,
  };
};

export const driIncentiveExpireDrpdwnAction = (onSuccess, onError) => {
  return {
    type: DRI_INCENTIVE_EXPIRE_DRP_DWN,
    onSuccess,
    onError,
  };
};
