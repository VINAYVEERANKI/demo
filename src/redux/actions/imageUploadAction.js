import {
  BG_VERIF_PIC,
  IMAGE_UPLOAD_COUPON,
  IMAGE_UPLOAD_RIDETYPE,
  PHY_VERIF_PIC,
  UPLOAD_ADRESS_PROOF,
  UPLOAD_DL,
  UPLOAD_INSURANCE,
  UPLOAD_PROFILE_PIC,
  UPLOAD_RC,
  VEHICLE_PIC,
} from "./types";

export const UploadAdressAction = (image, onSuccess, onError) => {
  return {
    type: UPLOAD_ADRESS_PROOF,
    image,
    onSuccess,
    onError,
  };
};

export const UploadDLAction = (image, onSuccess, onError) => {
  return {
    type: UPLOAD_DL,
    image,
    onSuccess,
    onError,
  };
};

export const UploadProfilePicAction = (image, onSuccess, onError) => {
  return {
    type: UPLOAD_PROFILE_PIC,
    image,
    onSuccess,
    onError,
  };
};

export const UploadBgverifPicAction = (image, onSuccess, onError) => {
  return {
    type: BG_VERIF_PIC,
    image,
    onSuccess,
    onError,
  };
};

export const UploadInsuranceAction = (image, onSuccess, onError) => {
  return {
    type: UPLOAD_INSURANCE,
    image,
    onSuccess,
    onError,
  };
};

export const UploadRCAction = (image, onSuccess, onError) => {
  return {
    type: UPLOAD_RC,
    image,
    onSuccess,
    onError,
  };
};

export const UploadVehiclePicAction = (image, onSuccess, onError) => {
  return {
    type: VEHICLE_PIC,
    image,
    onSuccess,
    onError,
  };
};

export const UploadPhyVerifPicAction = (image, onSuccess, onError) => {
  return {
    type: PHY_VERIF_PIC,
    image,
    onSuccess,
    onError,
  };
};

// coupon 

export const uploadImageCouponAction = (image, onSuccess, onError) => {
  return {
    type: IMAGE_UPLOAD_COUPON,
    image,
    onSuccess,
    onError,
  };
};

export const uploadImageRideTypeAction = (image, onSuccess, onError) => {
  return {
    type: IMAGE_UPLOAD_RIDETYPE,
    image,
    onSuccess,
    onError,
  };
};
