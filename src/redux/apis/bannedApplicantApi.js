import { api } from "./api";

export const bannedApplicationListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver/find-all-bannned-applications?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const bannedApplicantViewApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver/find-one-bannned-application?page_no=${pageNo}`,

    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const bannedApplicantReadApi = (params) => {
  return api.post(
    `/api/driver/bannned-application-profile-read`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
