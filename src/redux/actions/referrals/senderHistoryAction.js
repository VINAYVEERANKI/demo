import {
  REF_SENDER_USAGE_HISTORY_FIND_ALL,
  REF_SENDER_USAGE_HISTORY_FIND_ONE,
  DRIVER_REF_SENDER_USAGE_HISTORY,
  DRVIER_REF_SENDER_USAGE_HISTORY_LIST,
} from "../types";

/*************rider referrals */

export const riderRefSenderFindAllUsageHistoryAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: REF_SENDER_USAGE_HISTORY_FIND_ALL,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const riderRefSenderFindOneUsageHistoryAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: REF_SENDER_USAGE_HISTORY_FIND_ONE,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

/*************driver referrals ************/

export const driverRefSenderUsageHistoryListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DRVIER_REF_SENDER_USAGE_HISTORY_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const driverRefSenderUsageHistoryAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DRIVER_REF_SENDER_USAGE_HISTORY,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
