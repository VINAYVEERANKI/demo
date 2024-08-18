import { SEND_REVIEW_DRIVER_REFERRAL, SEND_REVIEW_REFERRAL } from "../types";

export const sendReviewReferralAction = (data, onSuccess, onError) => {
  return {
    type: SEND_REVIEW_REFERRAL,
    data,
    onSuccess,
    onError,
  };
};

// driver referral 

export const sendReviewDriverReferralAction = (data, onSuccess, onError) => {
  return {
    type: SEND_REVIEW_DRIVER_REFERRAL,
    data,
    onSuccess,
    onError,
  };
};
