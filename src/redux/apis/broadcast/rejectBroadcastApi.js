import { api } from "../api";

export const riderBroadCastRejectListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/rider-broadcast/rejected-findall?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const riderBroadCastRejectFindOneApi = (params) => {
  return api.post(
    `/api/rider-broadcast/rejected-findone`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const driverBroadCastRejectListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver-broadcast/rejected-findall?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const driverBroadCastRejectFindOneApi = (params) => {
  return api.post(
    `/api/driver-broadcast/rejected-findone`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const rideBroadcastRejectDrpdwnApi = (params) => {
  return api.post(
    "/api/rider-broadcast/rejected-drop-down-lists",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const driBroadcastRejectDrpdwnApi = (params) => {
  return api.post(
    "/api/driver-broadcast/rejected-drop-down-lists",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
