import { api } from "./api";

export const addVehicleTypeApi = (params) => {
  return api.post(
    "/api/ride_types/create-vehicle-type",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const rideTypeDropdownApi = (params) => {
  return api.get("/api/ride_types/rideType-dropdown-list", {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const vehicleTypeListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/ride_types/find-all-vehicle-types?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const vehicleTypeViewApi = (params) => {
  return api.post(
    `/api/ride_types/find-one-vehicle-type`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const vehicleTypeEditApi = (params) => {
  return api.post(
    `/api/ride_types/update-vehicle-type`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const vehicleTypeDropDownListApi = (params) => {
  console.log("jjgchgchgch");
  return api.post(
    "/api/ride_types/vehicleType-dropdown-list",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
