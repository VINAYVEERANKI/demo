import {
  DELETED_REFERRAL_ALL_VIEW,
  DELETED_REFERRAL_FIND_ONE,
  DELETE_DRIVER_REF,
  DELETE_DRIVER_REF_FIND_ONE,
  DELETE_REFERRAL,
  DRIVER_REF_DELETED_LIST,
} from "../types";


/*************rider referrals */


export const deleteReferralAction = (data, onSuccess, onError) => {
  return {
    type: DELETE_REFERRAL,
    data,
    onSuccess,
    onError,
  };
};

export const deletedReferralAllViewAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DELETED_REFERRAL_ALL_VIEW,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const deletedReferralFindOneAction = (data, onSuccess, onError) => {
  return {
    type: DELETED_REFERRAL_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};


/*************driver referrals ************/

export const deleteDriverRefAction = (data, onSuccess, onError) => {
  return {
    type: DELETE_DRIVER_REF,
    data,
    onSuccess,
    onError,
  };
};

export const deletedDriverRefListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DRIVER_REF_DELETED_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const deletedDriverRefAction = (data, onSuccess, onError) => {
  return {
    type: DELETE_DRIVER_REF_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};


