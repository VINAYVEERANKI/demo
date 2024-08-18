import {
  DRIVER_REF_REJECTED_LIST,
  REJECTED_REFERRAL_ALL_VIEW,
  REJECTED_REFERRAL_FIND_ONE,
  REJECT_DRIVER_REF,
  REJECT_DRIVER_REF_FIND_ONE,
  REJECT_REFERRAL,
} from "../types";



/*************rider referrals */


export const rejectReferralAction = (data, onSuccess, onError) => {
  return {
    type: REJECT_REFERRAL,
    data,
    onSuccess,
    onError, 
  };
};

export const rejectedReferralAllViewAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: REJECTED_REFERRAL_ALL_VIEW,
    data,
    current_page,
    onSuccess,
    onError,
  };
};


export const rejectedReferralFindOneAction = (data, onSuccess, onError) => {
  return {
    type: REJECTED_REFERRAL_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};


/*************driver referrals ************/

export const rejectedDriverRefListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DRIVER_REF_REJECTED_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const rejectDriverefAction = (data, onSuccess, onError) => {
  return {
    type: REJECT_DRIVER_REF,
    data,
    onSuccess,
    onError, 
  };
};



export const rejectedDriverRefAction = (data, onSuccess, onError) => {
  return {
    type: REJECT_DRIVER_REF_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};