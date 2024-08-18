import {
  APPROVE_DRIVER_ACCOUNT,
  BANNED_DRIVER_DROPDOWN_LIST,
  BAN_DRIVER_ACCOUNT,
  BLOCKED_DRIVER_DROPDOWN_LIST,
  BLOCK_DRIVER_ACCOUNT,
  DELETED_DRIVER_DROPDOWN_LIST,
  DELETE_DRIVER_ACCOUNT,
  DRIVER_ADDRESS_PROOF_EDIT,
  DRIVER_BANK_DETAILS_EDIT,
  DRIVER_BG_VERIF_EDIT,
  DRIVER_DL_EDIT,
  DRIVER_DROPDOWN_LIST,
  DRIVER_LIST,
  DRIVER_PHY_VERIF_EDIT,
  DRIVER_PREMIUM_HISTORY,
  DRIVER_PREMIUM_LIST_ACTION,
  DRIVER_PROFILE_EDIT,
  DRIVER_PROFILE_PIC_EDIT,
  DRIVER_PROFILE_READ,
  DRIVER_RC_EDIT,
  DRIVER_VEHICLE_EDIT,
  DRIVER_VEHICLE_IMAGE_EDIT,
  DRIVER_VIEW,
  DRIVER_VI_EDIT,
  EXPIRED_DOCUMENT_DROPDOWN_LIST,
  MANAGE_DRIVER_MAIN_ZONE_LIST,
  MANAGE_DRIVER_RIDETYPE_LIST,
  MANAGE_DRIVER_VEHICLETYPE_LIST,
  PENDING_DROPDOWN_LIST,
  PER_DELETED_DRIVER_DROPDOWN_LIST,
  REJECTED_DRIVER_DROPDOWN_LIST,
  REJECT_DRIVER_ACCOUNT,
  VEHICLETYPE_MODEL_COLOR_LIST,
} from "./types";

export const driverDropdownListAction = (onSuccess, onError) => {
  return {
    type: DRIVER_DROPDOWN_LIST,
    onSuccess,
    onError,
  };
};
export const pendDropdownListAction = (onSuccess, onError) => {
  return {
    type: PENDING_DROPDOWN_LIST,
    onSuccess,
    onError,
  };
};
export const blockedDriverDropdownListAction = (onSuccess, onError) => {
  return {
    type: BLOCKED_DRIVER_DROPDOWN_LIST,
    onSuccess,
    onError,
  };
};
export const expiredDropdownListAction = (onSuccess, onError) => {
  return {
    type: EXPIRED_DOCUMENT_DROPDOWN_LIST,
    onSuccess,
    onError,
  };
};
export const bannedDropdownListAction = (onSuccess, onError) => {
  return {
    type: BANNED_DRIVER_DROPDOWN_LIST,
    onSuccess,
    onError,
  };
};
export const rejectedDropdownListAction = (onSuccess, onError) => {
  return {
    type: REJECTED_DRIVER_DROPDOWN_LIST,
    onSuccess,
    onError,
  };
};
export const delDriverDropdownListAction = (onSuccess, onError) => {
  return {
    type: DELETED_DRIVER_DROPDOWN_LIST,
    onSuccess,
    onError,
  };
};
export const perdelDriverDropdownListAction = (onSuccess, onError) => {
  return {
    type: PER_DELETED_DRIVER_DROPDOWN_LIST,
    onSuccess,
    onError,
  };
};

export const driverListAction = (data, current_page, onSuccess, onError) => {
  return {
    type: DRIVER_LIST,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const driverViewAction = (data, current_page, onSuccess, onError) => {
  return {
    type: DRIVER_VIEW,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const driverPremiumHistory = (
  data,
  current_page,
  onSuccess,
  onError
) => {
  return {
    type: DRIVER_PREMIUM_HISTORY,
    data,
    current_page,
    onSuccess,
    onError,
  };
};

export const driverProfileReadAction = (data, onError) => {
  return {
    type: DRIVER_PROFILE_READ,
    data,
    onError,
  };
};
export const driverProfileEditAction = (id, data, onSuccess, onError) => {
  return {
    type: DRIVER_PROFILE_EDIT,
    id,
    data,
    onSuccess,
    onError,
  };
};
export const driverVehicleEditAction = (id, data, onSuccess, onError) => {
  return {
    type: DRIVER_VEHICLE_EDIT,
    id,
    data,
    onSuccess,
    onError,
  };
};
export const banDriverAction = (id, data, onSuccess, onError) => {
  return {
    type: BAN_DRIVER_ACCOUNT,
    id,
    data,
    onSuccess,
    onError,
  };
};
export const blockDriverAction = (id, data, onSuccess, onError) => {
  return {
    type: BLOCK_DRIVER_ACCOUNT,
    id,
    data,
    onSuccess,
    onError,
  };
};
export const deleteDriverAction = (id, data, onSuccess, onError) => {
  return {
    type: DELETE_DRIVER_ACCOUNT,
    id,
    data,
    onSuccess,
    onError,
  };
};
export const ApproveDriverAction = (data, onSuccess, onError) => {
  return {
    type: APPROVE_DRIVER_ACCOUNT,
    data,
    onSuccess,
    onError,
  };
};
export const RejectDriverAction = (data, onSuccess, onError) => {
  return {
    type: REJECT_DRIVER_ACCOUNT,
    data,
    onSuccess,
    onError,
  };
};
export const driverbankdetailsAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_BANK_DETAILS_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const driveradressproofAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_ADDRESS_PROOF_EDIT,
    data,
    onSuccess,
    onError,
  };
};

export const driverDLAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_DL_EDIT,
    data,
    onSuccess,
    onError,
  };
};

export const driverProfilePicAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_PROFILE_PIC_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const driverBGverifAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_BG_VERIF_EDIT,
    data,
    onSuccess,
    onError,
  };
};

export const driverVIAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_VI_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const driverRCAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_RC_EDIT,
    data,
    onSuccess,
    onError,
  };
};

export const driverVehiclePicAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_VEHICLE_IMAGE_EDIT,
    data,
    onSuccess,
    onError,
  };
};
export const driverPHYverifAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_PHY_VERIF_EDIT,
    data,
    onSuccess,
    onError,
  };
};

export const manageDriverMainZoneListAction = (onSuccess, onError) => {
  return {
    type: MANAGE_DRIVER_MAIN_ZONE_LIST,
    onSuccess,
    onError,
  };
};
export const manageDriverRideTypeListAction = (id, onSuccess, onError) => {
  return {
    type: MANAGE_DRIVER_RIDETYPE_LIST,
    id,
    onSuccess,
    onError,
  };
};
export const manageDriverVehicleTypeListAction = (id, onSuccess, onError) => {
  return {
    type: MANAGE_DRIVER_VEHICLETYPE_LIST,
    id,
    onSuccess,
    onError,
  };
};
export const VehicleTypeModelColorListAction = (id, onSuccess, onError) => {
  return {
    type: VEHICLETYPE_MODEL_COLOR_LIST,
    id,
    onSuccess,
    onError,
  };
};

export const driverPremiumListAction = (data, onSuccess, onError) => {
  return {
    type: DRIVER_PREMIUM_LIST_ACTION,
    data,
    onSuccess,
    onError,
  };
};
