import { api } from "../api";

export const myDriverComplaintsListApi = (params) => {
  return api.post(
    `/api/admin/driver/complaint/find-all-my-complaints`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const myComplaintsRiderListApi = (params) => {
  return api.post(
    `/api/admin/rider/complaint/find-all-my-complaints`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const closeDriverComplaintApi = (params) => {
  return api.post(
    `/api/admin/driver/inprogress-complaint/close-mobileapp-complaint`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const resolveDriverComplaintApi = (params) => {
  return api.post(
    `/api/admin/driver/inprogress-complaint/reslove-mobileapp-complaint`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const forwardDriverComplaintApi = (params) => {
  return api.post(
    `/api/admin/driver/inprogress-complaint/forward-complaint`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};


export const closeRiderComplaintApi = (params) => {
  return api.post(
    `/api/admin/rider/inprogress-complaint/close-mobileapp-complaint`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const resolveRiderComplaintApi = (params) => {
  return api.post(
    `/api/admin/rider/inprogress-complaint/reslove-mobileapp-complaint`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const forwardRiderComplaintApi = (params) => {
  return api.post(
    `/api/admin/rider/inprogress-complaint/forward-complaint`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
