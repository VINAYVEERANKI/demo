import { ACTIVE_COUPON_SEND_REVIEW, SEND_REVIEW_ACTION } from "../types";

export const sendReviewAction = (data, onSuccess, onError) => {
  return {
    type: SEND_REVIEW_ACTION,
    data,
    onSuccess,
    onError,
  };
};

export const activeCouponSendReviewAction = (data, onSuccess, onError) => {
  return {
    type: ACTIVE_COUPON_SEND_REVIEW,
    data,
    onSuccess,
    onError,
  };
};
