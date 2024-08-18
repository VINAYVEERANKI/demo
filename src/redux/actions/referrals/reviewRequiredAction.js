import {
  DRIVER_REF_REVIEW_REQ_LIST,
  REVIEW_REQUIRED_REFERRAL_ALL_VIEW,
  REVIEW_REQUIRED_REFRRAL_FIND_ONE,
  REVIEW_REQ_DRIVER_REF_BROADCAST_EDIT,
  REVIEW_REQ_DRIVER_REF_D_TO_D_EDIT,
  REVIEW_REQ_DRIVER_REF_D_TO_R_EDIT,
  REVIEW_REQ_DRIVER_REF_FIND_ONE,
  REVIEW_REQ_REFERRAL_BROADCAST_EDIT,
  REVIEW_REQ_REFERRAL_EDIT,
} from "../types";

/*************rider referrals */
export const reviewRequiredReferralAllViewAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: REVIEW_REQUIRED_REFERRAL_ALL_VIEW,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const reviewReqRefrralFindOneAction = (data, onSuccess, onError) => {
  return {
    type: REVIEW_REQUIRED_REFRRAL_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};
// edit
export const reviewReqReferralEditAction = (data, onSuccess, onError) => {
  return {
    type: REVIEW_REQ_REFERRAL_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const reviewReqReferralBroadcastEditAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: REVIEW_REQ_REFERRAL_BROADCAST_EDIT,
    data,
    onSuccess,
    onError,
  };
};

/*************driver referrals ************/

export const reviewReqDriverRefListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DRIVER_REF_REVIEW_REQ_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const reviewReqDriverRefFindOneAction = (data, onSuccess, onError) => {
  return {
    type: REVIEW_REQ_DRIVER_REF_FIND_ONE,
    data,
    onSuccess,
    onError,
  };
};
// edit
export const reviewReqDriverRefDToDEditAction = (data, onSuccess, onError) => {
  return {
    type: REVIEW_REQ_DRIVER_REF_D_TO_D_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const reviewReqDriverRefDToREditAction = (data, onSuccess, onError) => {
  return {
    type: REVIEW_REQ_DRIVER_REF_D_TO_R_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const reviewReqDriverRefBroadcastEditAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: REVIEW_REQ_DRIVER_REF_BROADCAST_EDIT,
    data,
    onSuccess,
    onError,
  };
};
