import { CLEAR_DRIVER_REFERRAL, CLEAR_RIDER_REFERRAL } from "../types";

export const clearRiderReferralAction = (data, onSuccess, onError) => {
  return {
    type: CLEAR_RIDER_REFERRAL,
    data,
    onSuccess,
    onError,
  };
};

export const clearDriverReferralAction = (data, onSuccess, onError) => {
  return {
    type: CLEAR_DRIVER_REFERRAL,
    data,
    onSuccess,
    onError,
  };
};

