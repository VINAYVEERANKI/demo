import {
  PREMIUM_CANCELLED_REFUND_LIST,
  PREMIUM_CANCELLED_REFUND_VIEW,
  PREMIUM_PENDING_REFUND_LIST,
  PREMIUM_PENDING_REFUND_UPDATE,
  PREMIUM_PENDING_REFUND_VIEW,
  PREMIUM_REFUND_CANCEL,
  PREMIUM_SUCCESSFUL_REFUND_LIST,
  PREMIUM_SUCCESSFUL_REFUND_VIEW,

} from "./types";

export const premiumPendingRefundListAction = (data, onSuccess, onError) => {
  return {
    type: PREMIUM_PENDING_REFUND_LIST,
    data,
    onSuccess,
    onError,
  };
};

export const premiumPendingRefundViewAction = (data, onSuccess, onError) => {
  return {
    type: PREMIUM_PENDING_REFUND_VIEW,
    data,
    onSuccess,
    onError,
  };
};

export const premiumPendingRefundUpdateAction = (data, onSuccess, onError) => {
  return {
    type: PREMIUM_PENDING_REFUND_UPDATE,
    data,
    onSuccess,
    onError,
  };
};

export const premiumCancelledRefundListAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: PREMIUM_CANCELLED_REFUND_LIST,
    data,
    onSuccess,
    onError,
  };
};

export const premiumCancelledRefundViewAction = (data, onSuccess, onError) => {
  return {
    type: PREMIUM_CANCELLED_REFUND_VIEW,
    data,
    onSuccess,
    onError,
  };
};

export const premiumSuccessFulRefundListAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: PREMIUM_SUCCESSFUL_REFUND_LIST,
    data,
    onSuccess,
    onError,
  };
};

export const premiumSuccessFulRefundViewAction = (data, onSuccess, onError) => {
  return {
    type: PREMIUM_SUCCESSFUL_REFUND_VIEW,
    data,
    onSuccess,
    onError,
  };
};

export const premiumRefundCancelAction = (data, onSuccess, onError) => {
  return {
    type: PREMIUM_REFUND_CANCEL,
    data,
    onSuccess,
    onError,
  };
};