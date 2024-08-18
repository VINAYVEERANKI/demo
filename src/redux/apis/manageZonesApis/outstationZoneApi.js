import { api } from "../api";

export const outstationZoneListApi = (params) => {
  return api.get(
    `/api/manage_zone/find-all-outstation-defined-cities?main_zone_id=${params}`,
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const addOutstationZoneApi = (params) => {
  return api.post(
    `/api/manage_zone/add-outstation-city`,
    (params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const outstationZoneViewApi = (params) => {
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
export const updateOutstationZoneApi = (params) => {
  return api.post(
    `/api/manage_zone/update-outstation-city`,
    (params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const deleteOutstationZoneApi = (params) => {
  return api.post(
    `/api/manage_zone/delete-outstation-city`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
