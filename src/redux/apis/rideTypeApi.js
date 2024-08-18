import { api } from "./api";

export const addRideTypeApi = (params) => {
  return api.post("/api/ride_types/create-ride-type", JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const rideTypeZoneListApi = (params) => {
  return api.get(
    "/api/ride_types/fetch-all-zones",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const rideTypeListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/ride_types/find-all-ride-types?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const rideTypeViewApi = (params) => {
  return api.post(
    `/api/ride_types/find-one-ride-type`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const editRideTypeApi = (params) => {
  return api.post(
    `/api/ride_types/update-ride-type`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const rideTypeDropDownListApi = (params) => {
  console.log("jjgchgchgch");
  return api.post(
    "/api/ride_types/rideType-dropdown-list",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};