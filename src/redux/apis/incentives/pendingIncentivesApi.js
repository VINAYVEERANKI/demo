import { api } from "../api";

// driver

// create
export const createDriverIncentiveApi = (params) => {
  return api.post(`/api/driver-incentive/create`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const driverIncentivePendingListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver-incentive/pending-find-all?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const driverIncentivePendingApi = (params) => {
  return api.post(
    `/api/driver-incentive/pending-find-one`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const driverIncentivePendingEditApi = (params) => {
  return api.post(`/api/driver-incentive/pending-edit`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const driIncentiveRevreqDrpdwnApi = (params) => {
  return api.post(
    "/api/driver-incentive/pending-drop-down-lists",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};