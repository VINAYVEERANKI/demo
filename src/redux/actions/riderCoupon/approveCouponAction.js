import { APPROVE_COUPON } from "../types";

export const approveCouponAction = (data, onSuccess, onError) => {
  return {
    type: APPROVE_COUPON,
    data,
    onSuccess,
    onError,
  };
};
