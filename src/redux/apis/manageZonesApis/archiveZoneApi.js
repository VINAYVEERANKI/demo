import { api } from "../api";

export const archiveZonesListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/manage_zone/archived_zone/find-all-archived-zone?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const addArchiveZoneApi = (params) => {
  return api.post(
    `/api/manage_zone/archived_zone/add-archive-zone`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const archiveZoneViewApi = (params) => {
  return api.post(
    `/api/manage_zone/archived_zone/find-one-archived-zone`,
(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const restoreArchiveZoneApi = (params) => {
  return api.post(
    `/api/manage_zone/archived_zone/restore-archived-zone`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const archivezoneDrpdwnApi = (params) => {
  return api.post(
    "/api/manage_zone/archived_zone/drop-down",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};