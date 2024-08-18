import {
  PENDING_APPLICANT_EDIT,
  PENDING_APPLICANT_READ,
  PENDING_APPLICANT_VEHICLE_EDIT,
  PENDING_APPLICANT_VIEW,
  PENDING_APPLICATION_LIST,
  PEND_ADDRESS_PROOF_APPROVE,
  PEND_ADDRESS_PROOF_EDIT,
  PEND_BANK_DETAILS_EDIT,
  PEND_BG_VERIF_APPROVE,
  PEND_BG_VERIF_EDIT,
  PEND_DL_APPROVE,
  PEND_DL_EDIT,
  PEND_PHY_VERIF_EDIT,
  PEND_PROFILE_PIC_APPROVE,
  PEND_PROFILE_PIC_EDIT,
  PEND_RC_EDIT,
  PEND_VEHICLE_INSURANCE_EDIT,
  PEND_VEHICLE_INSURANCE_APPROVE,
  PEND_RC_APPROVE,
  VEHICLE_PIC_EDIT,
  VEHICLE_PIC_APPROVE,
  PEND_PHY_VERIF_APPROVE,
} from "./types";

export const pendingApplicationListAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: PENDING_APPLICATION_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const pendingApplicantViewAction = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: PENDING_APPLICANT_VIEW,
    data,
    current_page,
    onSuccess,
    onError,
  };
};
export const pendingApplicantReadAction = (data, onError) => {
  return {
    type: PENDING_APPLICANT_READ,
    data,
    onError,
  };
};
export const pendingApplicantEditAction = (id, data, onSuccess, onError) => {
  return {
    type: PENDING_APPLICANT_EDIT,
    id,
    data,
    onSuccess,
    onError,
  };
};
export const pendingApplicantVehicleEditAction = (
  id,
  data,
  onSuccess,
  onError
) => {
  return {
    type: PENDING_APPLICANT_VEHICLE_EDIT,
    id,
    data,
    onSuccess,
    onError,
  };
};

export const pendApplicantbankdetailsAction = (data, onSuccess, onError) => {
  return {
    type: PEND_BANK_DETAILS_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const pendApplicantadressproofAction = (data, onSuccess, onError) => {
  return {
    type: PEND_ADDRESS_PROOF_EDIT,
    data,
    onSuccess,
    onError,
  };
};

export const pendadressApproveAction = (data, onSuccess, onError) => {
  return {
    type: PEND_ADDRESS_PROOF_APPROVE,
    data,
    onSuccess,
    onError,
  };
};

export const pendApplicantDLAction = (data, onSuccess, onError) => {
  return {
    type: PEND_DL_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const pendApplicantApproveAction = (data, onSuccess, onError) => {
  return {
    type: PEND_DL_APPROVE,
    data,
    onSuccess,
    onError,
  };
};

export const pendApplicantProfilePicAction = (data, onSuccess, onError) => {
  return {
    type: PEND_PROFILE_PIC_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const pendApplicantProfilePicApproveAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: PEND_PROFILE_PIC_APPROVE,
    data,
    onSuccess,
    onError,
  };
};

export const pendApplicantBGverifAction = (data, onSuccess, onError) => {
  return {
    type: PEND_BG_VERIF_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const pendBGverifApproveAction = (data, onSuccess, onError) => {
  return {
    type: PEND_BG_VERIF_APPROVE,
    data,
    onSuccess,
    onError,
  };
};
export const pendApplicantVIAction = (data, onSuccess, onError) => {
  return {
    type: PEND_VEHICLE_INSURANCE_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const pendApplicantVIApproveAction = (data, onSuccess, onError) => {
  return {
    type: PEND_VEHICLE_INSURANCE_APPROVE,
    data,
    onSuccess,
    onError,
  };
};

export const pendApplicantRCAction = (data, onSuccess, onError) => {
  return {
    type: PEND_RC_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const pendApplicantRCApproveAction = (data, onSuccess, onError) => {
  return {
    type: PEND_RC_APPROVE,
    data,
    onSuccess,
    onError,
  };
};
export const pendApplicantVehiclePicAction = (data, onSuccess, onError) => {
  return {
    type: VEHICLE_PIC_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const pendApplicantVehiclePicApproveAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: VEHICLE_PIC_APPROVE,
    data,
    onSuccess,
    onError,
  };
};

export const pendApplicantPHYverifAction = (data, onSuccess, onError) => {
  return {
    type: PEND_PHY_VERIF_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const pendApplicantPHYverifApproveAction = (
  data,
  onSuccess,
  onError
) => {
  return {
    type: PEND_PHY_VERIF_APPROVE,
    data,
    onSuccess,
    onError,
  };
};
