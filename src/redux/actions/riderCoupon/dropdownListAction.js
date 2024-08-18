import {
  COUPON_RIDETYPE_LIST,
  DROPDOWNLIST_RIDER_ACTIVE_COUPON,
  DROPDOWNLIST_RIDER_COUPON,
  DROPDOWNLIST_RIDER_DELETED_COUPON,
  DROPDOWNLIST_RIDER_EXPIRED_COUPON,
  DROPDOWNLIST_RIDER_REJECTED_COUPON,
  DROPDOWNLIST_RIDER_USAGE_COUPON,
} from "../types";

export const dropDownListRiderCouponAction = (onSuccess, onError) => {
  return {
    type: DROPDOWNLIST_RIDER_COUPON,
    onSuccess,
    onError,
  };
};
export const dropDownListRiderCouponActiveAction = (onSuccess, onError) => {
  return {
    type: DROPDOWNLIST_RIDER_ACTIVE_COUPON,
    onSuccess,
    onError,
  };
};
export const dropDownListRiderCouponRejectedAction = (onSuccess, onError) => {
  return {
    type: DROPDOWNLIST_RIDER_REJECTED_COUPON,
    onSuccess,
    onError,
  };
};

export const dropDownListRiderCouponDeletedAction = (onSuccess, onError) => {
  return {
    type: DROPDOWNLIST_RIDER_DELETED_COUPON,
    onSuccess,
    onError,
  };
};
export const dropDownListRiderCouponExpiredAction = (onSuccess, onError) => {
  return {
    type: DROPDOWNLIST_RIDER_EXPIRED_COUPON,
    onSuccess,
    onError,
  };
};
export const dropDownListRiderCouponUsageAction = (onSuccess, onError) => {
  return {
    type: DROPDOWNLIST_RIDER_USAGE_COUPON,
    onSuccess,
    onError,
  };
};
export const couponRideTypeListAction = ( onSuccess, onError) => {
  return {
    type: COUPON_RIDETYPE_LIST,
    onSuccess,
    onError,
  };
};