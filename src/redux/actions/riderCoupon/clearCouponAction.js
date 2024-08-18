import {
  CLEAR_REDUCER_DRIVER_COUPON,
  CLEAR_REDUCER_RIDER_COUPON,
} from "../returnTypes";
import { CLEAR_DRIVER_COUPON, CLEAR_RIDER_COUPON } from "../types";

export const clearRiderCouponAction = (data, onSuccess, onError) => {
  return {
    type: CLEAR_RIDER_COUPON,
    data,
    onSuccess,
    onError,
  };
};

export const clearDriverCouponAction = (data, onSuccess, onError) => {
  return {
    type: CLEAR_DRIVER_COUPON,
    data,
    onSuccess,
    onError,
  };
};

export const clearReducerRiderCouponAction = () => {
  return {
    type: CLEAR_REDUCER_RIDER_COUPON,
  };
};

export const clearReducerDriverCouponAction = () => {
  return {
    type: CLEAR_REDUCER_DRIVER_COUPON,
  };
};
