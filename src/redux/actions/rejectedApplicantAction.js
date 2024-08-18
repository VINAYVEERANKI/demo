import {
  REJECTED_APPLICANT_VIEW,
  REJECTED_APPLICATION_LIST,
  REJECT_ADDRESS_PROOF_EDIT,
  REJECT_APPLICANT_READ,
  REJECT_BANK_DETAILS_EDIT,
  REJECT_BG_VERIF_EDIT,
  REJECT_DL_EDIT,
  REJECT_PHY_VERIF_EDIT,
  REJECT_PROFILE_PIC_EDIT,
  REJECT_RC_EDIT,
  REJECT_VEHICLE_IMAGE_EDIT,
  REJECT_VI_EDIT,
} from "./types";

export const rejectedApplicationListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: REJECTED_APPLICATION_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const rejectedApplicantViewAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: REJECTED_APPLICANT_VIEW,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const rejectApplicantReadAction = (data, onError) => {
  return {
    type: REJECT_APPLICANT_READ,
    data,
    onError
  };
};

export const rejectApplicantbankdetailsAction = (data, onSuccess, onError) => {
  return {
    type: REJECT_BANK_DETAILS_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const rejectApplicantadressproofAction = (data, onSuccess, onError) => {
  return {
    type: REJECT_ADDRESS_PROOF_EDIT,
    data,
    onSuccess,
    onError,
  };
};

export const rejectApplicantDLAction = (data, onSuccess, onError) => {
  return {
    type: REJECT_DL_EDIT,
    data,
    onSuccess,
    onError,
  };
};

export const rejectApplicantProfilePicAction = (data, onSuccess, onError) => {
  return {
    type: REJECT_PROFILE_PIC_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const rejectApplicantBGverifAction = ( data, onSuccess, onError) => {
  return {
    type: REJECT_BG_VERIF_EDIT,
    data,
    onSuccess,
    onError,
  };
};

export const rejectApplicantVIAction = (data, onSuccess, onError) => {
  return {
    type: REJECT_VI_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const rejectApplicantRCAction = (data, onSuccess, onError) => {
  return {
    type: REJECT_RC_EDIT,
    data,
    onSuccess,
    onError,
  };
};

export const rejectApplicantVehiclePicAction = (data, onSuccess, onError) => {
  return {
    type: REJECT_VEHICLE_IMAGE_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const rejectApplicantPHYverifAction = ( data, onSuccess, onError) => {
  return {
    type: REJECT_PHY_VERIF_EDIT,
    data,
    onSuccess,
    onError,
  };
};