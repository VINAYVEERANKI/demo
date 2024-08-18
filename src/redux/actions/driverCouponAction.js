import {
  ACTIVE_DRIVER_COUPON,
  ACTIVE_DRIVER_COUPON_BROADCAST_EDIT,
  ACTIVE_DRIVER_COUPON_EDIT,
  ACTIVE_DRIVER_COUPON_LIST,
  APPROVE_DRIVER_COUPON,
  CREATE_DRIVER_COUPON,
  CREATE_DRIVER_COUPON_BROADCAST,
  DELETED_DRIVER_COUPON,
  DELETED_DRIVER_COUPON_LIST,
  DELETE_DRIVER_COUPON,
  DRIVER_COUPON_USAGE_HISTORY,
  DRIVER_COUPON_USAGE_HISTORY_LIST,
  DROPDOWNLIST_DRIVER_ACTIVE_COUPON,
  DROPDOWNLIST_DRIVER_DELETED_COUPON,
  DROPDOWNLIST_DRIVER_EXPIRED_COUPON,
  DROPDOWNLIST_DRIVER_PENDING_COUPON,
  DROPDOWNLIST_DRIVER_REJECTED_COUPON,
  DROPDOWNLIST_DRIVER_USAGE_COUPON,
  EXPIRED_DRIVER_COUPON,
  EXPIRED_DRIVER_COUPON_LIST,
  REJECTED_DRIVER_COUPON,
  REJECTED_DRIVER_COUPON_LIST,
  REJECT_DRIVER_COUPON,
  REVIEW_REQ_DRIVER_COUPON,
  REVIEW_REQ_DRIVER_COUPON_EDIT,
  REVIEW_REQ_DRIVER_COUPON_LIST,
} from "./types";

export const createDriverCouponAction = (data, onSuccess, onError) => {
  return {
    type: CREATE_DRIVER_COUPON,
    data,
    onSuccess,
    onError,
  };
};

export const createDriverCouponBroadCastAction = (data, onSuccess, onError) => {
  return {
    type: CREATE_DRIVER_COUPON_BROADCAST,
    data,
    onSuccess,
    onError,
  };
};

export const reviewReqDriverCouponListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: REVIEW_REQ_DRIVER_COUPON_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const reviewReqDriverCouponAction = (data, onSuccess, onError) => {
  return {
    type: REVIEW_REQ_DRIVER_COUPON,
    data,
    onSuccess,
    onError,
  };
};
export const reviewReqDriverCouponEditAction = (data, onSuccess, onError) => {
  return {
    type: REVIEW_REQ_DRIVER_COUPON_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const approveDriverCouponAction = (data, onSuccess, onError) => {
  return {
    type: APPROVE_DRIVER_COUPON,
    data,
    onSuccess,
    onError,
  };
};
export const rejectDriverCouponAction = (data, onSuccess, onError) => {
  return {
    type: REJECT_DRIVER_COUPON,
    data,
    onSuccess,
    onError,
  };
};

export const activeDriverCouponListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: ACTIVE_DRIVER_COUPON_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const activeDriverCouponAction = (data, onSuccess, onError) => {
  return {
    type: ACTIVE_DRIVER_COUPON,
    data,
    onSuccess,
    onError,
  };
};
export const activeDriverCouponEditAction = (data, onSuccess, onError) => {
  return {
    type: ACTIVE_DRIVER_COUPON_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const activeDriverCouponBroadCastEditAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: ACTIVE_DRIVER_COUPON_BROADCAST_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const rejectedDriverCouponListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: REJECTED_DRIVER_COUPON_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const rejectedDriverCouponAction = (data, onSuccess, onError) => {
  return {
    type: REJECTED_DRIVER_COUPON,
    data,
    onSuccess,
    onError,
  };
};
export const deletedDriverCouponListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DELETED_DRIVER_COUPON_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const deleteDriverCouponAction = (data, onSuccess, onError) => {
  return {
    type: DELETE_DRIVER_COUPON,
    data,
    onSuccess,
    onError,
  };
};
export const deletedDriverCouponAction = (data, onSuccess, onError) => {
  return {
    type: DELETED_DRIVER_COUPON,
    data,
    onSuccess,
    onError,
  };
};
export const expiredDriverCouponListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: EXPIRED_DRIVER_COUPON_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const expiredDriverCouponAction = (data, onSuccess, onError) => {
  return {
    type: EXPIRED_DRIVER_COUPON,
    data,
    onSuccess,
    onError,
  };
};
export const usageHistoryDriverCouponListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DRIVER_COUPON_USAGE_HISTORY_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const usageHistoryDriverCouponAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DRIVER_COUPON_USAGE_HISTORY,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const dropDownListDriverCouponAction = (onSuccess, onError) => {
  return {
    type: DROPDOWNLIST_DRIVER_PENDING_COUPON,
    onSuccess,
    onError,
  };
};

export const dropDownListDriverCouponActiveAction = (onSuccess, onError) => {
  return {
    type: DROPDOWNLIST_DRIVER_ACTIVE_COUPON,
    onSuccess,
    onError,
  };
};
export const dropDownListDriverCouponRejectedAction = (onSuccess, onError) => {
  return {
    type: DROPDOWNLIST_DRIVER_REJECTED_COUPON,
    onSuccess,
    onError,
  };
};

export const dropDownListDriverCouponDeletedAction = (onSuccess, onError) => {
  return {
    type: DROPDOWNLIST_DRIVER_DELETED_COUPON,
    onSuccess,
    onError,
  };
};
export const dropDownListDriverCouponExpiredAction = (onSuccess, onError) => {
  return {
    type: DROPDOWNLIST_DRIVER_EXPIRED_COUPON,
    onSuccess,
    onError,
  };
};
export const dropDownListDriverCouponUsageAction = (onSuccess, onError) => {
  return {
    type: DROPDOWNLIST_DRIVER_USAGE_COUPON,
    onSuccess,
    onError,
  };
};
