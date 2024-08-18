import { api } from "../api";

export const riderInprogressSOSListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/admin/rider/inprogress-sos/find-all-inprogress-sos?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const driverInprogressSOSListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/admin/driver/inprogress-sos/find-all-inprogress-sos?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const riderInprogressSOSApi = (params) => {
  return api.post(
    `/api/admin/rider/inprogress-sos/find-one-inprogress-sos`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const driverInprogressSOSApi = (params) => {
  return api.post(
    `/api/admin/driver/inprogress-sos/find-one-inprogress-sos`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const driverInProgSOSReAssignApi = (params) => {
  return api.post(
    `/api/admin/driver/inprogress-sos/reassign-inprogress-sos`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const riderInProgSOSReAssignApi = (params) => {
  return api.post(
    `/api/admin/rider/inprogress-sos/reassign-inprogress-sos`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const riderIDListApi = (params) => {
  return api.post(
    `/api/admin/driver/inprogress-sos/find-all-rider`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const driverIDListApi = (params) => {
  return api.post(
    `/api/admin/driver/inprogress-sos/find-all-driver`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const riderSOSInprogressDropDownApi = (pageNo = 0, params) => {
  return api.post(
    `/api/admin/rider/inprogress-sos/drop-down-inprogress`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const driverSOSInprogressDropDownApi = (pageNo = 0, params) => {
  return api.post(
    `/api/admin/driver/inprogress-sos/drop-down-inprogress`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
