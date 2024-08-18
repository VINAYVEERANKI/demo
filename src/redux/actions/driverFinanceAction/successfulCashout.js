import { DRFIN_SUCES_CASH_DRP_DWN, DRFIN_SUCES_CASH_TRANS_HIST_FIND_ONE, DRFIN_SUCES_CASH_TRANS_HIST_LIST } from "../types";

export const driFinSucesCashoutTransHisListAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: DRFIN_SUCES_CASH_TRANS_HIST_LIST,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };

  export const driFinSucesCashoutTransHisFindOneAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: DRFIN_SUCES_CASH_TRANS_HIST_FIND_ONE,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };

  export const drifinSucescashDropdownListAction = (onSuccess, onError) => {
    return {
      type: DRFIN_SUCES_CASH_DRP_DWN,
      onSuccess,
      onError,
    };
  };