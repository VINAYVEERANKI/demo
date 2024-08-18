import { api } from "../api";

export const riderBroadCastActiveListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/rider-broadcast/approved-findall?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const activeRiderBroadCastFindOneApi = (params) => {
  return api.post(
    `/api/rider-broadcast/approved-findone`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const activeRiderBroadCastEditApi = (params) => {
  return api.post(
    `/api/rider-broadcast/approved-edit`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};


export const driverBroadCastActiveListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver-broadcast/approved-findall?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const activeDriverBroadCastFindOneApi = (params) => {
  return api.post(
    `/api/driver-broadcast/approved-findone`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const activeDriverBroadCastEditApi = (params) => {
  return api.post(
    `/api/driver-broadcast/approved-edit`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const rideBroadcastActiveDrpdwnApi = (params) => {
  return api.post(
    "/api/rider-broadcast/approved-drop-down-lists",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const driBroadcastActiveDrpdwnApi = (params) => {
  return api.post(
    "/api/driver-broadcast/approved-drop-down-lists",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};