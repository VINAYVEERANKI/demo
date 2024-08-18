import { api } from "../api";

export const riderPendSOSListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/admin/rider/sos/find-all-pending-sos?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const driverPendSOSListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/admin/driver/sos/find-all-pending-sos?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const riderPendSOSApi = (params) => {
  return api.post(
    `/api/admin/rider/sos/find-one-pending-sos`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const driverPendSOSApi = (params) => {
  return api.post(
    `/api/admin/driver/sos/find-one-pending-sos`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const driverSOSInitiateApi = (params) => {
  return api.post(
    `/api/admin/driver/sos/initiate-pending-sos`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const riderSOSInitiateApi = (params) => {
  return api.post(
    `/api/admin/rider/sos/initiate-pending-sos`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const driverSOSAssignApi = (params) => {
  return api.post(
    `/api/admin/driver/sos/assign-pending-sos`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const riderSOSAssignApi = (params) => {
  return api.post(
    `/api/admin/rider/sos/assign-pending-sos`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const generateSosCallRiderApi = (params) => {
  return api.post(
    `/api/admin/rider/inprogress-sos/generate-call-rider-sos`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const generateSosCallDriverApi = (params) => {
  return api.post(
    `/api/admin/driver/inprogress-sos/generate-call-sos`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const assignSosToAdminListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/admin/driver/inprogress-sos/find-all-admins-sos?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const riderSOSPendingDropDownApi = (pageNo = 0, params) => {
  return api.post(
    `/api/admin/rider/sos/drop-down-pending`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const driverSOSPendingDropDownApi = (pageNo = 0, params) => {
  return api.post(
    `/api/admin/driver/sos/drop-down-pending`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
