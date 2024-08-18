import { api } from "../api";

export const mySOSDriverListApi = (params) => {
  return api.post(
    `/api/admin/driver/sos/find-all-my-sos?page_no=0`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const mySOSRiderListApi = (params) => {
  return api.post(
    `/api/admin/rider/sos/find-all-my-sos?page_no=0`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const closeSOSApi = (params) => {
  return api.post(
    `/api/admin/driver/inprogress-sos/close-mobileapp-sos`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const resolveSOSApi = (params) => {
  return api.post(
    `/api/admin/driver/inprogress-sos/reslove-mobileapp-sos`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const forwardSOSApi = (params) => {
  return api.post(
    `/api/admin/driver/inprogress-sos/forward-sos`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const closeRiderSOSApi = (params) => {
  return api.post(
    `/api/admin/rider/inprogress-sos/close-mobileapp-sos`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const resolveRiderSOSApi = (params) => {
  return api.post(
    `/api/admin/rider/inprogress-sos/reslove-mobileapp-sos`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const forwardRiderSOSApi = (params) => {
  return api.post(
    `/api/admin/rider/inprogress-sos/forward-sos`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
