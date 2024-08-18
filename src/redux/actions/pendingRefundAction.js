import { PENDING_REFUND_LIST, PENDING_REFUND_VIEW, PENDING_REFUND_UPDATE, PEND_REF_DRP_DWN } from "./types";

export const PendingRefundListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: PENDING_REFUND_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const PendingRefundViewAction = (data, onSuccess, onError) => {
  return {
    type: PENDING_REFUND_VIEW,
    data,
    onSuccess,
    onError,
  };
};

export const PendingRefundUpdateAction = (data, onSuccess, onError) => {
  return {
    type: PENDING_REFUND_UPDATE,
    data,
    onSuccess,
    onError,
  };
};

export const pendRefDropdownListAction = (onSuccess, onError) => {
  return {
    type: PEND_REF_DRP_DWN,
    onSuccess,
    onError,
  };
};
