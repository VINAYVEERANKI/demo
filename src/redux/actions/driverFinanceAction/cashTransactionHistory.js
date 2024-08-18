import { DRFIN_CASH_TRANS_DRP_DWN, DRFIN_CREATE_CASH_TRANS_HIST_FIND_ONE, DRFIN_CREATE_CASH_TRANS_HIST_LIST } from "../types";

export const driFinCashTransHisListAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: DRFIN_CREATE_CASH_TRANS_HIST_LIST,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };

  export const driFinCashTransHisFindOneAction = (
    data,
    onSuccess,
    onError
  ) => {
    return {
      type: DRFIN_CREATE_CASH_TRANS_HIST_FIND_ONE,
      data,
      onSuccess,
      onError,
    };
  };
  export const drifinCashtransDropdownListAction = (onSuccess, onError) => {
    return {
      type: DRFIN_CASH_TRANS_DRP_DWN,
      onSuccess,
      onError,
    };
  };