import { api } from "../api";

export const clearRiderReferralApi = (params) => {
  return api.post(
    `/api/rider/referral/go-back`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const clearDriverReferralApi = (params) => {
  return api.post(
    `api/driver/referral/go-back`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};