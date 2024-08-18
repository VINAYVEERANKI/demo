import { api } from "./api";

export const driverdropDownListApi = (params) => {
  return api.post(
    "/api/driver/drop-down-filter-driver",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const penddropDownListApi = (params) => {
  return api.post(
    "/api/driver/drop-down-filter-pending-application",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const banneddropDownListApi = (params) => {
  return api.post(
    "/api/driver/drop-down-filter-banned-application",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const expireddropDownListApi = (params) => {
  return api.post(
    "/api/driver/drop-down-filter-expired-application",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const rejecteddropDownListApi = (params) => {
  return api.post(
    "/api/driver/drop-down-filter-rejected-application",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const blockeddropDownListApi = (params) => {
  return api.post(
    "/api/driver/drop-down-filter-blocked-application",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const deletedDriverdropDownListApi = (params) => {
  return api.post(
    "/api/driver/delete/drop-down-deleted-driver-filter",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const perdeletedDriverdropDownListApi = (params) => {
  return api.post(
    "/api/driver/delete/drop-down-permanently-deleted-driver-filter",
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const driverListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver/find-all-drivers?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const driverViewApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver/find-one-driver?page_no=${pageNo}`,

    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const driverPremiumHistoryApi = (pageNo = 0, params) => {
  return api.get(
    `/api/driver/driver-profile-premium-history?page_no=${pageNo}&driver_id=${params}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const driverProfileReadApi = (params) => {
  return api.post(`/api/driver/driver-profile-read`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
export const driverProfileEditApi = (id = "", params) => {
  return api.post(
    `/api/driver/driver-profile-edit/${id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const driverVehicleEditApi = (id = "", params) => {
  return api.post(
    `/api/driver/driver-vehicle-edit/${id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const banDriverApi = (id = "", params) => {
  return api.post(
    `/api/driver/ban-driver-account/${id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const blockDriverApi = (id = "", params) => {
  return api.post(
    `/api/driver/block-driver-account/${id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const deleteDriverApi = (id = "", params) => {
  return api.post(
    `/api/driver/delete-driver-account/${id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const approveDriverApi = (params) => {
  return api.post(
    `/api/driver/approve-driver-Application`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const rejectDriverApi = (params) => {
  return api.post(
    `/api/driver/Reject-driver-application`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const driverbankdetailsApi = (params) => {
  return api.post(
    `/api/driver/main/save-main-bank-details`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const driveradressproofApi = (params) => {
  return api.post(
    `/api/driver/main/save-main-address-proof`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const driverDLApi = (params) => {
  return api.post(
    `/api/driver/main/save-main-driving-license`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const driverprofilePicApi = (params) => {
  return api.post(
    `/api/driver/main/save-main-profile-pic`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const driverBGverifApi = (params) => {
  return api.post(
    `/api/driver/main/save-main-backgruond-verification`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const driverVIApi = (params) => {
  return api.post(
    `/api/driver/main/save-main-vehicle-insurance`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const driverRCApi = (params) => {
  return api.post(
    `/api/driver/main/save-main-vehicle-rc`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const driverVehiclePicApi = (params) => {
  return api.post(
    `/api/driver/main/save-main-vehicle-pic`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const driverPHYverifApi = (params) => {
  return api.post(
    `/api/driver/main/save-main-physical-verification`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const manageDriverMainZoneListApi = (params) => {
  return api.get(`/api/driver/manage-zones-lists`, {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
export const manageDriverRideTypeListApi = (params) => {
  return api.get(`/api/driver/ride-type-lists?driver_id=${params}`, {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
export const manageDriverVehicleTypeListApi = (params) => {
  return api.get(`/api/driver/drop-down-vehiclemake?driver_id=${params}`, {
    // return api.post(`/api/driver/drop-down-vehicletype`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const driverPremiumListApi = (data, params) => {
  return api.get(
    `/api/driver/driver-profile-premium-history?page_no=${data.pageNo}&driver_id=${data.driver_id}&sort_by=${data.sort_by}&sort_order=${data.sort_order}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const driverColorModalApi = (id) => {
  return api.get(
    `/api/driver/drop-down-vehicle-model-color?vehicle_type_id=${id}`,

    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
