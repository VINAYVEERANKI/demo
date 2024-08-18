import {
  CLEAR_REDUCER_DRIVER_REFERRAL,
  CLEAR_REDUCER_RIDER_REFERRAL,
  CREATE_DRIVER_REFERRAL_FAILED,
  CREATE_DRIVER_REFERRAL_LOADED,
  CREATE_DRIVER_REFERRAL_LOADING,
  CREATE_RIDER_REFERRAL_FAILED,
  CREATE_RIDER_REFERRAL_LOADED,
  CREATE_RIDER_REFERRAL_LOADING,
} from "../../actions/returnTypes";

import {
  createDriverReferralData,
  createRiderReferralData,
} from "../../constants";

export const createRiderReferralReducer = (
  state = createRiderReferralData,
  action
) => {
  switch (action.type) {
    case CREATE_RIDER_REFERRAL_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
      };
    case CREATE_RIDER_REFERRAL_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        data: action.data,
      };
    case CREATE_RIDER_REFERRAL_LOADED:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        data: action.data,
      };
    case CLEAR_REDUCER_RIDER_REFERRAL:
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

export const createDriverReferralReducer = (
  state = createDriverReferralData,
  action
) => {
  switch (action.type) {
    case CREATE_DRIVER_REFERRAL_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
      };
    case CREATE_DRIVER_REFERRAL_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        data: action.data,
      };
    case CREATE_DRIVER_REFERRAL_LOADED:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        data: action.data,
      };
    case CLEAR_REDUCER_DRIVER_REFERRAL:
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
