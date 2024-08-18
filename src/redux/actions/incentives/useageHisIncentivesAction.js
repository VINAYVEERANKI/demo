import {
  DRIVER_INCENTIVE_USAGE_HIS,
  DRIVER_INCENTIVE_USAGE_HIS_LIST,
  DRI_INCENTIVE_USGHIS_DRP_DWN,
} from "../types";

// driver
export const driverIncentiveUseageHisListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DRIVER_INCENTIVE_USAGE_HIS_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const driverIncentiveUseageHisAction = (data,current_page, onSuccess, onError) => {
  return {
    type: DRIVER_INCENTIVE_USAGE_HIS,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const driIncentiveUsghisDrpdwnAction = (onSuccess, onError) => {
  return {
    type: DRI_INCENTIVE_USGHIS_DRP_DWN,
    onSuccess,
    onError,
  };
};
