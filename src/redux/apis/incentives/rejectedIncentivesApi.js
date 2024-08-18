import { api } from "../api";

// driver
export const driverIncentiveRejectedListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver-incentive/rejected-findall?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const driverIncentiveRejectedApi = (params) => {
  return api.post(
    `/api/driver-incentive/rejected-findone`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
// reject 
export const rejectDriverIncentiveApi = (params) => {
  return api.post(`/api/driver-incentive/reject`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const driIncentiveRejectDrpdwnApi = (params) => {
  return api.post(
    "/api/driver-incentive/rejected-drop-down-lists",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};