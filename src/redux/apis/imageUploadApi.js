import { api } from "./api";

export const ApplicantuploadAdressApi = (params) => {
  return api.post(
    `/api/driver/addressproof/upload-addressproof-image`,
    params,
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": false,
      },
    }
  );
};

export const UploadDLApi = (params) => {
  return api.post(`/api/driver/dl/upload-dl-image`, params, {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": false,
    },
  });
};

export const UploadProfilePicApi = (params) => {
  return api.post(`/api/driver/profile/upload-profile-image`, params, {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": false,
    },
  });
};
export const UploadBgverifPicApi = (params) => {
  return api.post(`/api/driver/bv/upload-bv-image`, params, {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": false,
    },
  });
};

export const UploadInsuranceApi = (params) => {
  return api.post(`/api/driver/insurance/upload-insurance-image`, params, {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": false,
    },
  });
};

export const UploadRCApi = (params) => {
  return api.post(`/api/driver/rc/upload-rc-image`, params, {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": false,
    },
  });
};
export const UploadVehiclePicApi = (params) => {
  return api.post(`/api/driver/vehicle/upload-vehicle-image`, params, {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": false,
    },
  });
};
export const UploadPhyVerifPicApi = (params) => {
  return api.post(`/api/driver/pv/upload-pv-image`, params, {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": false,
    },
  });
};
export const uploadImageCouponApi = (params) => {
  return api.post(`/api/rider/coupon/image/upload-coupon-image`, params, {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": false,
    },
  });
};

export const uploadImageRideTypeApi = (params) => {
  return api.post(`/api/ride_types/upload-rideandvehicletype-image`, params, {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": false,
    },
  });
};
