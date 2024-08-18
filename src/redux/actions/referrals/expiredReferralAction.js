import {
  DRIVER_REF_EXPIRED_ID_LIST,
  EXPIRED_DRIVER_REF_ID,
  EXPIRED_REFERRAL_ALL_VIEW,
  EXPIRED_REFERRAL_FIND_ONE,
} from "../types";


/*************rider referrals */


export const expiredReferralAllViewAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: EXPIRED_REFERRAL_ALL_VIEW,
    data,
    current_page,
    onSuccess,
    onError,
  };
};


export const expiredReferralFindOneAction = (data, onSuccess, onError) => {
  return {
    type: EXPIRED_REFERRAL_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};


/*************driver referrals ************/

export const expiredDriverRefIdListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DRIVER_REF_EXPIRED_ID_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const expiredDriverRefIdAction = (data, onSuccess, onError) => {
  return {
    type: EXPIRED_DRIVER_REF_ID,
    data,
    onSuccess,
    onError,
  };
};