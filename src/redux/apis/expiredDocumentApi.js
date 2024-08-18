import { api } from "./api";

export const expiredDocumentListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver/find-all-exprired-documents?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const expiredDocumentViewApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver/find-one-exprired-document?page_no=${pageNo}`,

    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const expiredprofileReadApi = (params) => {
  return api.post(`/api/driver/exprired-profile-read`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
export const expiredbankdetailsApi = (params) => {
  return api.post(
    `/api/driver/save-expired-bank-details`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const expireddocumentadressproofApi = (params) => {
  return api.post(
    `/api/driver/save-expired-address-proof`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const expireddocumentDLApi = (params) => {
  return api.post(
    `/api/driver/save-expired-driving-license`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const expireddocumentprofilePicApi = (params) => {
  return api.post(
    `/api/driver/save-expired-profile-pic`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const expireddocumentBGverifApi = (params) => {
  return api.post(
    `/api/driver/save-expired-backgruond-verification`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const expireddocumentVIApi = (params) => {
  return api.post(
    `/api/driver/save-expired-vehicle-insurance`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const expireddocumentRCApi = (params) => {
  return api.post(
    `/api/driver/save-expired-vehicle-rc`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const expireddocumentVehiclePicApi = (params) => {
  return api.post(
    `/api/driver/save-expired-vehicle-pic`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const expireddocumentPHYverifApi = (params) => {
  return api.post(
    `/api/driver/save-expired-physical-verification`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
