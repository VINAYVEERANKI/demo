import { api } from "../api";

export const riderInprogressComplaintsListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/admin/rider/inprogress-complaint/find-all-inprogress-complaint?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const driverInprogressComplaintsListApi = (pageNo = 0, params) => {
  return api.post(
    `/api/admin/driver/inprogress-complaint/find-all-inprogress-complaint?page_no=${pageNo}`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const riderInprogressComplaintApi = (params) => {
  return api.post(
    `/api/admin/rider/inprogress-complaint/find-one-inprogress-complaint`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const driverInprogressComplaintApi = (params) => {
  return api.post(
    `/api/admin/driver/inprogress-complaint/find-one-inprogress-complaint`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const driverInProgComplaintReAssignApi = (params) => {
  return api.post(
    `/api/admin/driver/inprogress-complaint/reassign-inprogress-complaint`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};

export const riderInProgComplaintReAssignApi = (params) => {
  return api.post(
    `/api/admin/rider/inprogress-complaint/reassign-inprogress-complaint`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const bookingIDListApi = (params) => {
  return api.post(
    `/api/admin/driver/inprogress-complaint/find-all-bookings`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const riderComplInprogressDropDownApi = (params) => {
  return api.post(
    `/api/admin/rider/inprogress-complaint/drop-down-inprogress`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};
export const driverComplInprogressDropDownApi = (params) => {
  return api.post(
    `/api/admin/driver/inprogress-complaint/drop-down-inprogress`,
    JSON.stringify(params),
    {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    }
  );
};