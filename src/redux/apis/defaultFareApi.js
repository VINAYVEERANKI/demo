import { api } from "./api";

export const localDefaultFareValueApi = (params) => {
  return api.post(
    `/api/default_fares/find-all-local-defaultfare`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const EditLocalDefaultfareApi = (params) => {
  return api.post(
    `/api/default_fares/edit-local-defaultfare`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const specialZoneFareValueApi = (params) => {
  return api.post(
    `/api/default_fares/find-all-special-defaultfare`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const EditSpecialZonefareApi = (params) => {
  return api.post(
    `/api/default_fares/edit-special-defaultfare`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const RentalFareValueApi = (params) => {
  return api.post(
    `/api/default_fares/find-all-rental-defaultfare`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const EditRentalFareApi = (params) => {
  return api.post(
    `/api/default_fares/edit-rental-defaultfare`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const tollsFareValueApi = (params) => {
  return api.post(
    `/api/default_fares/find-all-tolls-defaultfare`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const EditTollsfareApi = (params) => {
  return api.post(
    `/api/default_fares/edit-tolls-defaultfare`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const OnewayTripFareValueApi = (params) => {
  return api.post(
    `/api/default_fares/fina-all-one-way-defaultfare`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const EditOnewayPackageDetailsApi = (params) => {
  return api.post(
    `/api/default_fares/edit-package-details-oneway`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const EditOneWayTripfareApi = (params) => {
  return api.post(
    `/api/default_fares/edit-one-way-defaultfare`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const RoundTripFareValueApi = (params) => {
  return api.post(
    `/api/default_fares/find-all-round-trip-defaultfare`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const EditRoundTripPackageDetailsApi = (params) => {
  return api.post(
    `/api/default_fares/edit-package-details-roundtrip`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const EditRoundTripfareApi = (params) => {
  return api.post(
    `/api/default_fares/edit-round-trip-defaultfare`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const defaultRideTypeListApi = (params) => {
  return api.get(
    `/api/default_fares/rental-defaultfare-ridetype-drop-down`,
    params,
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
