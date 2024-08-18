import {
  CLEAR_REDUCER_DRIVER_REFERRAL,
  CLEAR_REDUCER_RIDER_REFERRAL
} from "../returnTypes";
import {
  CREATE_DRIVER_TO_DRIVER_REFERRAL,
  CREATE_DRIVER_TO_RIDER_REFERRAL,
  CREATE_REFERRAL,
} from "../types";

export const createReferralAction = (data, onSuccess, onError) => {
  return {
    type: CREATE_REFERRAL,
    data,
    onSuccess,
    onError,
  };
};

export const createDriverToDriverRefAction = (data, onSuccess, onError) => {
  return {
    type: CREATE_DRIVER_TO_DRIVER_REFERRAL,
    data,
    onSuccess,
    onError,
  };
};

export const createDriverToRiderRefAction = (data, onSuccess, onError) => {
  return {
    type: CREATE_DRIVER_TO_RIDER_REFERRAL,
    data,
    onSuccess,
    onError,
  };
};

export const clearReducerRiderReferralAction = () => {
  return {
    type: CLEAR_REDUCER_RIDER_REFERRAL,
  };
};
export const clearReducerDriverReferralAction = () => {
  return {
    type: CLEAR_REDUCER_DRIVER_REFERRAL,
  };
};
