import {
  EXPIRED_ADDRESS_PROOF_EDIT,
  EXPIRED_APPLICANT_VIEW,
  EXPIRED_APPLICATION_LIST,
  EXPIRED_BANK_DETAILS_EDIT,
  EXPIRED_BG_VERIF_EDIT,
  EXPIRED_DL_EDIT,
  EXPIRED_PHY_VERIF_EDIT,
  EXPIRED_PROFILE_PIC_EDIT,
  EXPIRED_PROFILE_READ,
  EXPIRED_RC_EDIT,
  EXPIRED_VEHICLE_IMAGE_EDIT,
  EXPIRED_VI_EDIT,
} from "./types";

export const expiredDocumentListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: EXPIRED_APPLICATION_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const expiredApplicantViewAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: EXPIRED_APPLICANT_VIEW,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const expiredprofileReadAction = (data, onSuccess, onError) => {
  return {
    type: EXPIRED_PROFILE_READ,
    data,
    // onSuccess,
    onError,
  };
};
export const expireddocumentbankdetailsAction = (data, onSuccess, onError) => {
  return {
    type: EXPIRED_BANK_DETAILS_EDIT,
    data,
    onSuccess,
    onError,
  };
};

export const expireddocumentadressproofAction = (data, onSuccess, onError) => {
  return {
    type: EXPIRED_ADDRESS_PROOF_EDIT,
    data,
    onSuccess,
    onError,
  };
};

export const expireddocumentDLAction = (data, onSuccess, onError) => {
  return {
    type: EXPIRED_DL_EDIT,
    data,
    onSuccess,
    onError,
  };
};

export const expireddocumentProfilePicAction = (data, onSuccess, onError) => {
  return {
    type: EXPIRED_PROFILE_PIC_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const expireddocumentBGverifAction = (data, onSuccess, onError) => {
  return {
    type: EXPIRED_BG_VERIF_EDIT,
    data,
    onSuccess,
    onError,
  };
};

export const expireddocumentVIAction = (data, onSuccess, onError) => {
  return {
    type: EXPIRED_VI_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const expireddocumentRCAction = (data, onSuccess, onError) => {
  return {
    type: EXPIRED_RC_EDIT,
    data,
    onSuccess,
    onError,
  };
};

export const expireddocumentVehiclePicAction = (data, onSuccess, onError) => {
  return {
    type: EXPIRED_VEHICLE_IMAGE_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const expireddocumentPHYverifAction = (data, onSuccess, onError) => {
  return {
    type: EXPIRED_PHY_VERIF_EDIT,
    data,
    onSuccess,
    onError,
  };
};
