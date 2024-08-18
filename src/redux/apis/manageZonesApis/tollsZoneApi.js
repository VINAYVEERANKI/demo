import { api } from "../api";

export const tollsZoneListApi = (params) => {
  return api.get(
    `/api/manage_zone/find-all-toll-defined-cities?main_zone_id=${params}`,

    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const addTollsZoneApi = (params) => {
  return api.post(`/api/manage_zone/add-toll-zone`, params, {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
export const tollsZoneViewApi = (params) => {
  return api.post(
    `/api/manage_zone/find-one-toll-city`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const updateTollsZoneApi = (params) => {
  return api.post(`/api/manage_zone/update-toll-zone`, params, {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
export const deleteTollsZoneApi = (params) => {
  return api.post(`/api/manage_zone/delete-toll-zone`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
