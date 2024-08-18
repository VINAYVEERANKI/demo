import { api } from "../api";

export const riderBroadCastExpiredListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/rider-broadcast/expired-findall?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const RiderBroadCastExpiredFindOneApi = (params) => {
  return api.post(
    `/api/rider-broadcast/expired-findone`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const driverBroadCastExpiredListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver-broadcast/expired-findall?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const driverBroadCastExpiredFindOneApi = (params) => {
  return api.post(
    `/api/driver-broadcast/expired-findone`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const rideBroadcastExpiredDrpdwnApi = (params) => {
  return api.post(
    "/api/rider-broadcast/expired-drop-down-lists",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const driBroadcastExpireDrpdwnApi = (params) => {
  return api.post(
    "/api/driver-broadcast/expired-drop-down-lists",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};