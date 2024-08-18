import { api } from "./api";

export const ManageFaresListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/manage_fares/find-all-zones-managefares?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const SpecialZoneListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/manage_fares/find-all-special-zones-managefares?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const FaresSpecialZonesApi = (params) => {
  return api.post(
    `/api/manage_fares/find-one-special-zones-managefares`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const FaresSpecialZonesEditApi = (params) => {
  return api.post(
    `/api/manage_fares/edit-special-zones-managefares`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const FaresTollsListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/manage_fares/find-all-tolls-fares?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const FaresTollsZonesApi = (params) => {
  return api.post(
    `/api/manage_fares/find-one-tolls-fares`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const FaresTollsEditApi = (params) => {
  return api.post(
    `/api/manage_fares/find-edit-tolls-fares-managefares`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const FaresOneWaytripListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/manage_fares/find-all-oneWay-fares?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const FaresOneWaytripZonesApi = (params) => {
  return api.post(
    `/api/manage_fares/find-one-oneWay-fares`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const FaresOneWaytripEditApi = (params) => {
  return api.post(
    `/api/manage_fares/edit-oneWay-fares-details `,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const FaresOneWaytripPackageEditApi = (params) => {
  return api.post(
    `/api/manage_fares/edit-oneWay-priceModule-fares`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const FaresLocalDropDownListApi = (params) => {
  return api.post(
    `/api/manage_fares/drop-down-pickup`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const FaresLocalCreateApi = (params) => {
  return api.post(
    `/api/manage_fares/create-fare-cities`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const FaresLocalZonesListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/manage_fares/find-all-local-zones-managefares?page_no=${pageNo}`,
    params,
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const FaresLocalZonesApi = (params) => {
  return api.post(
    `/api/manage_fares/find-one-local-managefares`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const FaresLocalUpdatepricingModuleApi = (params) => {
  return api.post(
    `/api/manage_fares/update-local-pricing-module`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const FaresLocalUpdatepricingDetailsApi = (params) => {
  return api.post(
    `/api/manage_fares/update-local-pricing-deatils`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const FaresRoundTripListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/manage_fares/find-all-roundtrip?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const FaresRoundTripZonesApi = (params) => {
  return api.post(
    `/api/manage_fares/find-one-roundtrip-fares`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const FaresRoundTripEditApi = (params) => {
  return api.post(
    `/api/manage_fares/edit-roundtrip-faredetails`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const FaresRoundTripPackageEditApi = (params) => {
  return api.post(
    `/api/manage_fares/edit-roundtrip-pricemodule-fares`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const RentalListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/manage_fares/find-all-rental-fares?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const FaresRentalApi = (params) => {
  return api.post(
    `/api/manage_fares/find-one-rental-fares`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const FaresRentalEditApi = (params) => {
  return api.post(
    `/api/manage_fares/edit-rental-faredetails`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const zoneStatusChangeApi = (params) => {
  return api.post(
    `/api/manage_fares/main-zone-fare-status-update`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const createRentalPackageApi = (params) => {
  return api.post(
    `/api/manage_fares/create-rental-package-time`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const deleteRentalPackageApi = (params) => {
  return api.post(
    `/api/manage_fares/delete-rental-package-time`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const managefaresDrpdwnApi = (params) => {
  return api.post(
    "/api/manage_fares/main-zone-fare-drop-down",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};