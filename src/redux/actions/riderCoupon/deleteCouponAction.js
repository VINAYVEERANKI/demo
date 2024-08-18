import { DELETE_COUPON } from "../types";

export const deleteCouponAction = (data, onSuccess, onError) => {
  return {
    type: DELETE_COUPON,
    data,
    onSuccess,
    onError,
  };
};
