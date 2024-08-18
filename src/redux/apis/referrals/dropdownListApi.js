import { api } from "../api";

// rider referral
export const dropDownListRiderReferralApi = (params) => {
  return api.post(
    `/api/rider/referral/drop-down-pending-refrral`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const dropDownListRiderReferralActiveApi = (params) => {
  return api.post(
    `/api/rider/referral/drop-down-active-refrral`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const dropDownListRiderReferralRejectedApi = (params) => {
  return api.post(
    `/api/rider/referral/drop-down-reject-refrral`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const dropDownListRiderReferralDeletedApi = (params) => {
  return api.post(
    `/api/rider/referral/drop-down-delete-refrral`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const dropDownListRiderReferralExpiredApi = (params) => {
  return api.post(
    `/api/rider/referral/drop-down-expired-refrral`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const dropDownListRiderReferralUsageApi = (params) => {
  return api.post(
    `/api/rider/referral/drop-down-usage-history`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

// driver referral
export const dropDownListDriverReferralApi = (params) => {
  return api.post(
    `/api/driver/referral/drop-down-pending-refrral`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const dropDownListDriverReferralActiveApi = (params) => {
  return api.post(
    `/api/driver/referral/drop-down-active-refrral`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const dropDownListDriverReferralRejectedApi = (params) => {
  return api.post(
    `/api/driver/referral/drop-down-reject-refrral`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const dropDownListDriverReferralDeletedApi = (params) => {
  return api.post(
    `/api/driver/referral/drop-down-delete-refrral`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const dropDownListDriverReferralExpiredApi = (params) => {
  return api.post(
    `/api/driver/referral/drop-down-expired-refrral`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const dropDownListDriverReferralUsageApi = (params) => {
  return api.post(
    `/api/driver/referral/drop-down-usage-history`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const referralRideTypeListApi = (params) => {
  return api.post(
    `/api/driver/referral/ride-type-lists`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};