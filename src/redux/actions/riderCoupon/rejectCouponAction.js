import { REJECT_COUPON } from "../types";

export const rejectCouponAction = (data, onSuccess, onError) => {
  return {
    type: REJECT_COUPON,
    data,
    onSuccess,
    onError,
  };
};
