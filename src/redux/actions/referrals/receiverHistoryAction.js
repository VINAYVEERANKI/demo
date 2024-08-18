import {
  DRIVER_REF_RECEIVER_USAGE_HISTORY,
  DRIVER_REF_SENDER_USAGE_HISTORY,
  DRVIER_REF_RECEIVER_USAGE_HISTORY_LIST,
  REF_RECEIVER_USAGE_HISTORY_FIND_ALL,
  REF_RECEIVER_USAGE_HISTORY_FIND_ONE,
} from "../types";

/*************rider referrals */

export const riderRefRecevierFindAllUsageHisAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: REF_RECEIVER_USAGE_HISTORY_FIND_ALL,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const riderRefRecevierFindOneUsageHisAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: REF_RECEIVER_USAGE_HISTORY_FIND_ONE,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

/*************driver referrals ************/

export const driverRefRecevierUsageHistoryListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DRVIER_REF_RECEIVER_USAGE_HISTORY_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const driverRefRecevierUsageHistoryAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DRIVER_REF_RECEIVER_USAGE_HISTORY,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
