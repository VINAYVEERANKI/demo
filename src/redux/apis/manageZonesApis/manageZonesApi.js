import { api } from "../api";

export const manageZonesListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/manage_zone/find-all-main-zones?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const addMainZoneApi = (params) => {
  return api.post(`/api/manage_zone/add-main-zone`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const mainZoneViewApi = (params) => {
  return api.post(
    `/api/manage_zone/find-one-main-zone`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const findAllCoordinatesApi = (params) => {
  return api.get(`/api/manage_zone/find-all-coordinates`, {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
export const editMainZoneApi = (params) => {
  return api.post(`/api/manage_zone/main-zone-edit`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const managezoneDrpdwnApi = (params) => {
  return api.post(
    "/api/manage_zone/main-zone-drop-down",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
