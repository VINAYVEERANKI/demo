import { api } from "../api";

export const riderBroadCastDeleteListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/rider-broadcast/deleted-findall?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const riderBroadCastDeleteApi = (params) => {
  return api.post(`/api/rider-broadcast/delete`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
export const deleteRiderBroadCastFindOneApi = (params) => {
  return api.post(
    `/api/rider-broadcast/deleted-findone`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const driverBroadCastDeleteListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver-broadcast/deleted-findall?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const driverBroadCastDeleteApi = (params) => {
  return api.post(`/api/driver-broadcast/delete`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
export const deletDriverBroadCastFindOneApi = (params) => {
  return api.post(
    `/api/driver-broadcast/deleted-findone`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const rideBroadcastDeleteDrpdwnApi = (params) => {
  return api.post(
    "/api/rider-broadcast/deleted-drop-down-lists",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const driBroadcastDeleteDrpdwnApi = (params) => {
  return api.post(
    "/api/driver-broadcast/deleted-drop-down-lists",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};