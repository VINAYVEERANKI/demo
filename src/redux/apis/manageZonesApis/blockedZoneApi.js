import { api } from "../api";

export const blockZonesListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/manage_zone/block/find-all-block-zone?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const addBlockZoneApi = (params) => {
  return api.post(
    `/api/manage_zone/block/create-block-zone`,
    (params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const updateBlockZoneApi = (params) => {
  return api.post(
    `/api/manage_zone/block/update-block-zone`,
    (params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const blockZoneViewApi = (params) => {
  return api.post(
    `/api/manage_zone/block/find-one-block-zone`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const unBlockZoneApi = (params) => {
  return api.post(
    `/api/manage_zone/block/unblock-zone`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const blockedzoneDrpdwnApi = (params) => {
  return api.post(
    "/api/manage_zone/block/drop-down",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};