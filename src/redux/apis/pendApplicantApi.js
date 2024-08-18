import { api } from "./api";

export const pendingApplicationListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver/find-all-drivers-applications?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const pendingApplicantViewApi = (pageNo = 0, params) => {
  return api.post(
    `/api/driver/find-one-driver-application?page_no=${pageNo}`,

    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const pendingApplicantReadApi = (params) => {
  return api.post(
    `/api/driver/driver-application-profile-read`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const pendingApplicantEditApi = (id = "", params) => {
  return api.post(
    `/api/driver/driver-application-profile-edit/${id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const pendingApplicantVehicleEditApi = (id = "", params) => {
  return api.post(
    `/api/driver/driver-application-vehicle-edit/${id}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const pendApplicantbankdetailsApi = (params) => {
  return api.post(`/api/driver/save-bank-details`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const pendApplicantadressproofApi = (params) => {
  return api.post(`/api/driver/save-address-proof`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const pendadressApproveApi = (params) => {
  return api.post(`/api/driver/approve-address-proof`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
export const pendApplicantDLApi = (params) => {
  return api.post(`/api/driver/save-driving-license`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const pendDLApproveApi = (params) => {
  return api.post(
    `/api/driver/approve-driving-license`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const pendApplicantprofilePicApi = (params) => {
  return api.post(`/api/driver/save-profile-pic`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
export const pendApplicantprofilePicApproveApi = (params) => {
  return api.post(`/api/driver/approve-profile-pic`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
export const pendApplicantBGverifApi = (params) => {
  return api.post(
    `/api/driver/save-backgruond-verification`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const pendApplicantBGApproveApi = (params) => {
  return api.post(`/api/driver/approve-bv`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const pendApplicantRCApi = (params) => {
  return api.post(`/api/driver/save-vehicle-rc`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
export const pendApplicantRCApproveApi = (params) => {
  return api.post(`/api/driver/approve-vehicle-rc`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};

export const pendApplicantVIApi = (params) => {
  return api.post(
    `/api/driver/save-vehicle-insurance`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const pendApplicantVIApproveApi = (params) => {
  return api.post(
    `/api/driver/approve-vehicle-insurance`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const pendApplicantVehiclePicApi = (params) => {
  return api.post(`/api/driver/save-vehicle-pic`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
export const pendApplicantVehiclePicApproveApi = (params) => {
  return api.post(`/api/driver/approve-vehicle-pic`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
export const pendApplicantPHYverifApi = (params) => {
  return api.post(
    `/api/driver/save-physical-verification`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const pendApplicantPHYApproveVerifApi = (params) => {
  return api.post(`/api/driver/approve-pv`, JSON.stringify(params), {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
      "Content-Type": "application/json",
    },
  });
};
