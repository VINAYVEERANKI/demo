import { api } from "../api";

// driver
export const driverIncentiveUseageHisListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver-incentive/usage-history-findall?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const driverIncentiveUseageHisApi = (pageNo = 0,params) => {
  return api.post(
    `/api/driver-incentive/usage-history-findone?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const driIncentiveUsghisDrpdwnApi = (params) => {
  return api.post(
    "/api/driver-incentive/usage-history-drop-down-lists",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};