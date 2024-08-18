import { api } from "../api";

export const riderResolvedClosedSOSListApi = (pageNo = 0, params) => {
    return api.post(
      `/api/admin/rider/inprogress-sos/find-all-resolve-close-sos?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };
export const driverResolvedClosedSOSListApi = (pageNo = 0, params) => {
    return api.post(
      `/api/admin/driver/inprogress-sos/find-all-resolve-close-sos?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const riderResClosedSOSApi = (params) => {
    return api.post(
      `/api/admin/rider/inprogress-sos/find-one-resolve-close-sos`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };
  export const driverResClosedSOSApi = (params) => {
    return api.post(
      `/api/admin/driver/inprogress-sos/find-one-resolve-close-sos`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };