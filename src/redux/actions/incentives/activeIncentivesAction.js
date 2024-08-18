import {
  APPROVE_DRIVER_INCENTIVE,
  DRIVER_INCENTIVE_ACTIVE,
  DRIVER_INCENTIVE_ACTIVE_CAMPAIGN_EDIT,
  DRIVER_INCENTIVE_ACTIVE_EDIT,
  DRIVER_INCENTIVE_ACTIVE_LIST,
  DRI_INCENTIVE_ACTIVE_DRP_DWN,
} from "../types";

// driver
export const driverIncentiveActiveListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DRIVER_INCENTIVE_ACTIVE_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const driverIncentiveActiveAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_INCENTIVE_ACTIVE,
    data,
    onSuccess,
    onError,
  };
};
export const driverIncentiveActiveEditAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_INCENTIVE_ACTIVE_EDIT,
    data,
    onSuccess,
    onError,
  };
};

export const driverIncentiveActiveCampaignEdit = (data, onSuccess, onError) => {
  return {
    type: DRIVER_INCENTIVE_ACTIVE_CAMPAIGN_EDIT,
    data,
    onSuccess,
    onError,
  };
};
// approve
export const approveDriverIncentiveAction = (data, onSuccess, onError) => {
  return {
    type: APPROVE_DRIVER_INCENTIVE,
    data,
    onSuccess,
    onError,
  };
};

export const driIncentiveActiveDrpdwnAction = (onSuccess, onError) => {
  return {
    type: DRI_INCENTIVE_ACTIVE_DRP_DWN,
    onSuccess,
    onError,
  };
};
