import { SUCCESSFUL_REFUND_LIST, SUCCESSFUL_REFUND_VIEW, SUCES_REF_DRP_DWN } from "./types";

export const SuccessFulRefundListAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: SUCCESSFUL_REFUND_LIST,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };

  export const SuccessFulRefundViewAction = (data, onSuccess, onError) => {
    return {
      type: SUCCESSFUL_REFUND_VIEW,
      data,
      onSuccess,
      onError,
    };
  };

  export const sucesRefDropdownListAction = (onSuccess, onError) => {
    return {
      type: SUCES_REF_DRP_DWN,
      onSuccess,
      onError,
    };
  };