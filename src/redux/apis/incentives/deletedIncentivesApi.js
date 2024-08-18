import { api } from "../api";

// driver
export const driverIncentiveDeletedListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver-incentive/deleted-findall?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const driverIncentiveDeletedApi = (params) => {
  return api.post(
    `/api/driver-incentive/deleted-findone`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
// delete 
export const deleteDriverIncentiveApi = (params) => {
  return api.post(`/api/driver-incentive/delete`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const driIncentiveDeleteDrpdwnApi = (params) => {
  return api.post(
    "/api/driver-incentive/deleted-drop-down-lists",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
