import { DRFIN_CASHOUT_TRANS_DRP_DWN, DRFIN_CASHOUT_TRANS_HIST_FIND_ONE, DRFIN_CASHOUT_TRANS_HIST_LIST } from "../types";

export const driFinCashoutTransHisListAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: DRFIN_CASHOUT_TRANS_HIST_LIST,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };

  export const  driFinCashTransHisFindOneAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: DRFIN_CASHOUT_TRANS_HIST_FIND_ONE,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };

  export const drifinCashouttransDropdownListAction = (onSuccess, onError) => {
    return {
      type: DRFIN_CASHOUT_TRANS_DRP_DWN,
      onSuccess,
      onError,
    };
  };