import { DRFIN_CUR_BAL_DRP_DWN, DRFIN_CUR_BAL_FIND_ONE, DRFIN_CUR_BAL_LIST } from "../types";

export const driFinCurBalListAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: DRFIN_CUR_BAL_LIST,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };

  export const driFinCurBalFindOneAction = (
    data,
    current_page,
    onSuccess,
    onError
  ) => {
    return {
      type: DRFIN_CUR_BAL_FIND_ONE,
      data,
      current_page,
      onSuccess,
      onError,
    };
  };
  export const drifinCurbalDropdownListAction = (onSuccess, onError) => {
    return {
      type: DRFIN_CUR_BAL_DRP_DWN,
      onSuccess,
      onError,
    };
  };