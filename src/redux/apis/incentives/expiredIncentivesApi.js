import { api } from "../api";

// driver
export const driverIncentiveExpiredListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver-incentive/expired-findall?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const driverIncentiveExpiredApi = (params) => {
  return api.post(
    `/api/driver-incentive/expired-findone`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const driIncentiveExpireDrpdwnApi = (params) => {
  return api.post(
    "/api/driver-incentive/expired-drop-down-lists",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};