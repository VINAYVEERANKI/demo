import {
  BLOCKED_ADDRESS_PROOF_EDIT,
  BLOCKED_APPLICANT_READ,
  BLOCKED_APPLICANT_VIEW,
  BLOCKED_APPLICATION_LIST,
  BLOCKED_BANK_DETAILS_EDIT,
  BLOCKED_BG_VERIF_EDIT,
  BLOCKED_DL_EDIT,
  BLOCKED_PHY_VERIF_EDIT,
  BLOCKED_PROFILE_PIC_EDIT,
  BLOCKED_RC_EDIT,
  BLOCKED_VEHICLE_IMAGE_EDIT,
  BLOCKED_VI_EDIT,
  UNBLOCK_DRIVER,
} from "../types";

export const blockedApplicationListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: BLOCKED_APPLICATION_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const blockedApplicantViewAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: BLOCKED_APPLICANT_VIEW,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const blockedApplicantReadAction = (data, onError) => {
  return {
    type: BLOCKED_APPLICANT_READ,
    data,
    onError
  };
};

export const UnBlockDriverAction = (data, onSuccess, onError) => {
  return {
    type: UNBLOCK_DRIVER,
    data,
    onSuccess,
    onError,
  };
};

export const blockedDriversbankdetailsAction = (data, onSuccess, onError) => {
  return {
    type: BLOCKED_BANK_DETAILS_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const blockedDriversadressproofAction = (data, onSuccess, onError) => {
  return {
    type: BLOCKED_ADDRESS_PROOF_EDIT,
    data,
    onSuccess,
    onError,
  };
};

export const blockedDriversDLAction = (data, onSuccess, onError) => {
  return {
    type: BLOCKED_DL_EDIT,
    data,
    onSuccess,
    onError,
  };
};

export const blockedDriversProfilePicAction = (data, onSuccess, onError) => {
  return {
    type: BLOCKED_PROFILE_PIC_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const blockedDriversBGverifAction = (data, onSuccess, onError) => {
  return {
    type: BLOCKED_BG_VERIF_EDIT,
    data,
    onSuccess,
    onError,
  };
};

export const blockedDriversVIAction = (data, onSuccess, onError) => {
  return {
    type: BLOCKED_VI_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const blockedDriversRCAction = (data, onSuccess, onError) => {
  return {
    type: BLOCKED_RC_EDIT,
    data,
    onSuccess,
    onError,
  };
};

export const blockedDriversVehiclePicAction = (data, onSuccess, onError) => {
  return {
    type: BLOCKED_VEHICLE_IMAGE_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const blockedDriversPHYverifAction = (data, onSuccess, onError) => {
  return {
    type: BLOCKED_PHY_VERIF_EDIT,
    data,
    onSuccess,
    onError,
  };
};
