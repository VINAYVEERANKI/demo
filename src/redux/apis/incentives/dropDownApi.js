import { api } from "../api";

export const incentiveMainZoneListApi = (params) => {
  return api.get(`/api/driver-incentive/manage-zones-lists`, {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
export const incentiveRideTypeListApi = (params) => {
  return api.get(`/api/driver-incentive/ride-type-lists`, params, {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
