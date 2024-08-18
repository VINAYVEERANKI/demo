import {
  DROPDOWNLIST_RIDER_ACTIVE_REFERRAL,
  DROPDOWNLIST_RIDER_PENDING_REFERRAL,
  DROPDOWNLIST_RIDER_DELETED_REFERRAL,
  DROPDOWNLIST_RIDER_EXPIRED_REFERRAL,
  DROPDOWNLIST_RIDER_REJECTED_REFERRAL,
  DROPDOWNLIST_DRIVER_ACTIVE_REFERRAL,
  DROPDOWNLIST_DRIVER_PENDING_REFERRAL,
  DROPDOWNLIST_DRIVER_DELETED_REFERRAL,
  DROPDOWNLIST_DRIVER_EXPIRED_REFERRAL,
  DROPDOWNLIST_DRIVER_REJECTED_REFERRAL,
  DROPDOWNLIST_RIDER_USAGE_REFERRAL,
  DROPDOWNLIST_DRIVER_USAGE_REFERRAL,
  REFERRAL_RIDETYPE_LIST,
} from "../types";

// rider referral
export const dropDownListRiderReferralAction = (onSuccess, onError) => {
  return {
    type: DROPDOWNLIST_RIDER_PENDING_REFERRAL,
    onSuccess,
    onError,
  };
};
export const dropDownListRiderReferralActiveAction = (onSuccess, onError) => {
  return {
    type: DROPDOWNLIST_RIDER_ACTIVE_REFERRAL,
    onSuccess,
    onError,
  };
};
export const dropDownListRiderReferralRejectedAction = (onSuccess, onError) => {
  return {
    type: DROPDOWNLIST_RIDER_REJECTED_REFERRAL,
    onSuccess,
    onError,
  };
};

export const dropDownListRiderReferralDeletedAction = (onSuccess, onError) => {
  return {
    type: DROPDOWNLIST_RIDER_DELETED_REFERRAL,
    onSuccess,
    onError,
  };
};
export const dropDownListRiderReferralExpiredAction = (onSuccess, onError) => {
  return {
    type: DROPDOWNLIST_RIDER_EXPIRED_REFERRAL,
    onSuccess,
    onError,
  };
};
export const dropDownListRiderReferralUsageAction = (onSuccess, onError) => {
  return {
    type: DROPDOWNLIST_RIDER_USAGE_REFERRAL,
    onSuccess,
    onError,
  };
};

// driver referral
export const dropDownListDriverReferralAction = (onSuccess, onError) => {
  return {
    type: DROPDOWNLIST_DRIVER_PENDING_REFERRAL,
    onSuccess,
    onError,
  };
};
export const dropDownListDriverReferralActiveAction = (onSuccess, onError) => {
  return {
    type: DROPDOWNLIST_DRIVER_ACTIVE_REFERRAL,
    onSuccess,
    onError,
  };
};
export const dropDownListDriverReferralRejectedAction = (
  onSuccess,
  onError
) => {
  return {
    type: DROPDOWNLIST_DRIVER_REJECTED_REFERRAL,
    onSuccess,
    onError,
  };
};

export const dropDownListDriverReferralDeletedAction = (onSuccess, onError) => {
  return {
    type: DROPDOWNLIST_DRIVER_DELETED_REFERRAL,
    onSuccess,
    onError,
  };
};
export const dropDownListDriverReferralExpiredAction = (onSuccess, onError) => {
  return {
    type: DROPDOWNLIST_DRIVER_EXPIRED_REFERRAL,
    onSuccess,
    onError,
  };
};
export const dropDownListDriverReferralUsageAction = (onSuccess, onError) => {
  return {
    type: DROPDOWNLIST_DRIVER_USAGE_REFERRAL,
    onSuccess,
    onError,
  };
};
export const referralRideTypeListAction = (onSuccess, onError) => {
  return {
    type: REFERRAL_RIDETYPE_LIST,
    onSuccess,
    onError,
  };
};
