import { RIDER_FINANCE_VIEW, RIDER_FINANCE_LIST_FIND_ALL, RIDER_FINANCE_DROPDOWN_LIST } from "../types";

export const riderFinanceListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: RIDER_FINANCE_LIST_FIND_ALL,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const riderFinanceViewAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: RIDER_FINANCE_VIEW,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const riderFinanceDropdownListAction = (
  onSuccess,
  onError
) => {
  return {
    type: RIDER_FINANCE_DROPDOWN_LIST,
    onSuccess,
    onError,
  };
};
