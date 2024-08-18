import { api } from "../api";

export const localZoneListApi = (params) => {
  return api.get(
    `/api/manage_zone/find-all-loc-defined-cities?main_zone_id=${params}`,
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const addLocalZoneApi = (params) => {
  return api.post(`/api/manage_zone/add-local-city`, params, {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
export const localZoneViewApi = (params) => {
  return api.post(
    `/api/manage_zone/find-one-local-city`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const updateLocalZoneApi = (params) => {
  return api.post(
    `/api/manage_zone/update-local-city`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const deleteLocalZoneApi = (params) => {
  return api.post(
    `/api/manage_zone/delete-local-city`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
