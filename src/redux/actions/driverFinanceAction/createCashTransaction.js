import {
  DRFIN_CREATE_CASH_DRP_DWN,
  DRFIN_CREATE_CASH_TRANS,
  DRFIN_CREATE_CASH_TRANS_LIST,
  PREMIUM_PLAN,
  PREMIUM_PLAN_CANCEL_ACTIVE,
  PREMIUM_PLAN_CANCEL_SCHEDULE,
  PREMIUM_PLAN_SCHEDULE,
  PREMIUM_PLAN_SWITCH,
  PREMIUM_SCHEDULE_PLAN,
} from "../types";

export const driFinCreateCashTransListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DRFIN_CREATE_CASH_TRANS_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const driFinCreateCashTransCreateAction = (data, onSuccess, onError) => {
  return {
    type: DRFIN_CREATE_CASH_TRANS,
    data,
    onSuccess,
    onError,
  };
};

export const drifinCreateCashDropdownListAction = (onSuccess, onError) => {
  return {
    type: DRFIN_CREATE_CASH_DRP_DWN,
    onSuccess,
    onError,
  };
};

export const premiumPlanAction = (data, onSuccess, onError) => {
  return {
    type: PREMIUM_PLAN,
    data,
    onSuccess,
    onError,
  };
};
export const premiumSchedulePlanAction = (data, onSuccess, onError) => {
  return {
    type: PREMIUM_SCHEDULE_PLAN,
    data,
    onSuccess,
    onError,
  };
};

export const premiumPlanSwitchAction = (data, onSuccess, onError) => {
  return {
    type: PREMIUM_PLAN_SWITCH,
    data,
    onSuccess,
    onError,
  };
};

export const premiumPlanScheduleAction = (data, onSuccess, onError) => {
  return {
    type: PREMIUM_PLAN_SCHEDULE,
    data,
    onSuccess,
    onError,
  };
};

export const premiumPlanCancelScheduleAction = (data, onSuccess, onError) => {
  return {
    type: PREMIUM_PLAN_CANCEL_SCHEDULE,
    data,
    onSuccess,
    onError,
  };
};

export const premiumPlanCancelActiveAction = (data, onSuccess, onError) => {
  return {
    type: PREMIUM_PLAN_CANCEL_ACTIVE,
    data,
    onSuccess,
    onError,
  };
};