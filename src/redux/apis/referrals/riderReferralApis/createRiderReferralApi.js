import { api } from "../../api";

export const createReferralApi = (params) => {
  return api.post(
    "/api/rider/referral/create-rider-referral",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const createDriverToDriverReferralApi = (params) => {
  return api.post(
    "/api/driver/referral/create-driver-to-driver-referral",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const createDriverToRiderReferralApi = (params) => {
  return api.post(
    "/api/driver/referral/create-driver-to-rider-referral",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
