import {
  ACTIVE_REFERRAL_ALL_VIEW,
  ACTIVE_REFERRAL_BROADCAST_EDIT,
  ACTIVE_REFERRAL_EDIT,
  ACTIVE_REFERRAL_FIND_ONE,
  APPROVE_DRIVER_REF,
  APPROVE_REFERRAL,
  DRIVER_ACTIVE_REF_BROADCAST_EDIT,
  DRIVER_ACTIVE_REF_EDIT,
  DRIVER_ACTIVE_REF_FIND_ONE,
  DRIVER_REF_ACTIVE_LIST,
} from "../types";


/*************rider referrals */
export const approveReferralAction = (data, onSuccess, onError) => {
  return {
    type: APPROVE_REFERRAL,
    data,
    onSuccess,
    onError,
  };
};

export const activeReferralAllViewAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: ACTIVE_REFERRAL_ALL_VIEW,
    data,
    current_page,
    onSuccess,
    onError,
  };
};


export const activeReferralFindOneAction = (data, onSuccess, onError) => {
  return {
    type: ACTIVE_REFERRAL_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};

export const activeReferralEditAction = (data, onSuccess, onError) => {
  return {
    type: ACTIVE_REFERRAL_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const activeReferralBroadcastEditAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: ACTIVE_REFERRAL_BROADCAST_EDIT,
    data,
    onSuccess,
    onError,
  };
};


/*************driver referrals ************/

export const approveDriverRefAction = (data, onSuccess, onError) => {
  return {
    type: APPROVE_DRIVER_REF,
    data,
    onSuccess,
    onError,
  };
};
export const activeDriverRefListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DRIVER_REF_ACTIVE_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const activeDriverRefFindOneAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_ACTIVE_REF_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};

export const activeDriverRefEditAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_ACTIVE_REF_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const activeDriverRefBroadcastEditAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: DRIVER_ACTIVE_REF_BROADCAST_EDIT,
    data,
    onSuccess,
    onError,
  };
};