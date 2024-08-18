import { api } from "../api";

export const riderPendComplaintsListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/admin/rider/complaint/find-all-pending-complaint?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const driverPendComplaintsListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/admin/driver/complaint/find-all-pending-complaint?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const riderPendComplaintApi = (params) => {
  return api.post(
    `/api/admin/rider/complaint/find-one-pending-complaint`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const driverPendComplaintApi = (params) => {
  return api.post(
    `/api/admin/driver/complaint/find-one-pending-complaint`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const driverComplaintInitiateApi = (params) => {
  return api.post(
    `/api/admin/driver/complaint/initiate-pending-complaint`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const riderComplaintInitiateApi = (params) => {
  return api.post(
    `/api/admin/rider/complaint/initiate-pending-complaint`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const driverComplaintAssignApi = (params) => {
  return api.post(
    `/api/admin/driver/complaint/assign-pending-complaint`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const riderComplaintAssignApi = (params) => {
  return api.post(
    `/api/admin/rider/complaint/assign-pending-complaint`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const assignToAdminListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/admin/driver/inprogress-complaint/find-all-admins?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const riderComplPendingDropDownApi = (params) => {
  return api.post(
    `/api/admin/rider/complaint/drop-down-pending`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const driverComplPendingDropDownApi = (params) => {
  return api.post(
    `/api/admin/driver/complaint/drop-down-pending`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
