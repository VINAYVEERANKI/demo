import { CANCELLED_REFUND_LIST, CANCELLED_REFUND_VIEW, CANCEL_REF_DRP_DWN } from "./types";

export const CancelledRefundListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: CANCELLED_REFUND_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const CancelledRefundViewAction = (data, onSuccess, onError) => {
  return {
    type: CANCELLED_REFUND_VIEW,
    data,
    onSuccess,
    onError,
  };
};

export const cancelRefDropdownListAction = (onSuccess, onError) => {
  return {
    type: CANCEL_REF_DRP_DWN,
    onSuccess,
    onError,
  };
};