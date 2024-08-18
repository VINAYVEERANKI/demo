import { api } from "../api";

// driver
export const driverIncentiveActiveListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver-incentive/approved-findall?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const driverIncentiveActiveApi = (params) => {
  return api.post(
    `/api/driver-incentive/approved-findone`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const driverIncentiveActiveEditApi = (params) => {
  return api.post(
    `/api/driver-incentive/approved-edit`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const driverIncentiveActiveCampaignEditApi = (params) => {
  return api.post(
    `/api/driver-incentive/approved-campaign-date-edit`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const approveDriverIncentiveApi = (params) => {
  return api.post(`/api/driver-incentive/approve`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const driIncentiveActiveDrpdwnApi = (params) => {
  return api.post(
    "/api/driver-incentive/approved-drop-down-lists",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};