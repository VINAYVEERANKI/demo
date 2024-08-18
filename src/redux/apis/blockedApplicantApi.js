import { api } from "./api";

export const blockedApplicationListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver/find-all-blocked-applications?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const blockedApplicantViewApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver/find-one-blocked-application?page_no=${pageNo}`,

    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const blockedApplicantReadApi = (params) => {
  return api.post(`/api/driver/view-blocked-profile`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
export const unblockDriverApi = (params) => {
  return api.post(
    `/api/driver/unblock-driver-application`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const blockedApplicantbankdetailsApi = (params) => {
  return api.post(
    `/api/driver/save-blocked-bank-details`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const blockedApplicantadressproofApi = (params) => {
  return api.post(
    `/api/driver/save-blocked-address-proof`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const blockedApplicantDLApi = (params) => {
  return api.post(
    `/api/driver/save-blocked-driving-license`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const blockedApplicantprofilePicApi = (params) => {
  return api.post(
    `/api/driver/save-blocked-profile-pic`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const blockedApplicantBGverifApi = (params) => {
  return api.post(
    `/api/driver/save-blocked-backgruond-verification`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const blockedApplicantVIApi = (params) => {
  return api.post(
    `/api/driver/save-blocked-vehicle-insurance`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const blockedApplicantRCApi = (params) => {
  return api.post(
    `/api/driver/save-blocked-vehicle-rc`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const blockedApplicantVehiclePicApi = (params) => {
  return api.post(
    `/api/driver/save-blocked-vehicle-pic`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const blockedApplicantPHYverifApi = (params) => {
  return api.post(
    `/api/driver/save-blocked-physical-verification`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
