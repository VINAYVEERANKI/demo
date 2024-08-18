import {
  CLEAR_REDUCER_DRIVER_COUPON,
  CLEAR_REDUCER_RIDER_COUPON,
  CREATE_DRIVER_COUPON_FAILED,
  CREATE_DRIVER_COUPON_LOADED,
  CREATE_DRIVER_COUPON_LOADING,
  CREATE_RIDER_COUPON_FAILED,
  CREATE_RIDER_COUPON_LOADED,
  CREATE_RIDER_COUPON_LOADING,
} from "../../actions/returnTypes";
import { createDriverCouponData, createRiderCouponData } from "../../constants";

// export const reviewRequiredCouponReducer = (
//   state = reviewRequiredCouponData,
//   action
// ) => {
//   switch (action.type) {
//     case REVIEW_REQUIRED_COUPON_DATA_LOADING:
//       return {
//         ...state,
//         loading: true,
//         success: false,
//         error: false,
//       };
//     case REVIEW_REQUIRED_COUPON_DATA_FAILED:
//       return {
//         ...state,
//         loading: false,
//         success: false,
//         error: true,
//         data: action.data,
//       };
//     case REVIEW_REQUIRED_COUPON_DATA_LOADED:
//       return {
//         ...state,
//         loading: false,
//         success: true,
//         error: false,
//         data: action.data,
//       };
//     default:
//       return state;
//   }
// };

export const createRiderCouponReducer = (
  state = createRiderCouponData,
  action
) => {
  switch (action.type) {
    case CREATE_RIDER_COUPON_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
      };
    case CREATE_RIDER_COUPON_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        data: action.data,
      };
    case CREATE_RIDER_COUPON_LOADED:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        data: action.data,
      };
    case CLEAR_REDUCER_RIDER_COUPON:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        data: {},
      };

    default:
      return state;
  }
};

export const createDriverCouponReducer = (
  state = createDriverCouponData,
  action
) => {
  switch (action.type) {
    case CREATE_DRIVER_COUPON_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
      };
    case CREATE_DRIVER_COUPON_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        data: action.data,
      };
    case CREATE_DRIVER_COUPON_LOADED:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        data: action.data,
      };
    case CLEAR_REDUCER_DRIVER_COUPON:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        data: {},
      };

    default:
      return state;
  }
};
