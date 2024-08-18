import { api } from "./api";

export const rejectedApplicationListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver/find-all-rejected-applications?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const rejectedApplicantViewApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver/find-one-rejected-application?page_no=${pageNo}`,

    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const rejectApplicantReadApi = (params) => {
  return api.post(
    `/api/driver/rejected-application-profile-read`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const rejectApplicantbankdetailsApi = (params) => {
  return api.post(
    `/api/driver/save-reject-bank-details`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const rejectApplicantadressproofApi = (params) => {
  return api.post(
    `/api/driver/save-reject-address-proof`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const rejectApplicantDLApi = (params) => {
  return api.post(
    `/api/driver/save-reject-driving-license`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const rejectApplicantprofilePicApi = (params) => {
  return api.post(
    `/api/driver/save-reject-profile-pic`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const rejectApplicantBGverifApi = (params) => {
  return api.post(
    `/api/driver/save-reject-backgruond-verification`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const rejectApplicantVIApi = (params) => {
  return api.post(
    `/api/driver/save-reject-vehicle-insurance`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const rejectApplicantRCApi = (params) => {
  return api.post(
    `/api/driver/save-reject-vehicle-rc`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const rejectApplicantVehiclePicApi = (params) => {
  return api.post(
    `/api/driver/save-reject-vehicle-pic`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const rejectApplicantPHYverifApi = (params) => {
  return api.post(
    `/api/driver/save-reject-physical-verification`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
