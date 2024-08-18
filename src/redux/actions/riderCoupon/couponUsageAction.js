import {
  COUPON_USAGE_HISTORY_ALL_VIEW,
  COUPON_USAGE_HISTORY_FIND_ONE,
} from "../types";

export const couponUsageHistoryAllViewAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: COUPON_USAGE_HISTORY_ALL_VIEW,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const couponUsageHistoryFindOneAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: COUPON_USAGE_HISTORY_FIND_ONE,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
