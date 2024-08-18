import { api } from "../api";

export const riderResolvedClosedComplaintsListApi = (pageNo = 0, params) => {
    return api.post(
      `/api/admin/rider/inprogress-complaint/find-all-resolve-close-complaint?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };
export const driverResolvedClosedComplaintsListApi = (pageNo = 0, params) => {
    return api.post(
      `/api/admin/driver/inprogress-complaint/find-all-resolve-close-complaint?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const riderResClosedComplaintApi = (params) => {
    return api.post(
      `/api/admin/rider/inprogress-complaint/find-one-resolve-close-complaint`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };
  export const driverResClosedComplaintApi = (params) => {
    return api.post(
      `/api/admin/driver/inprogress-complaint/find-one-resolve-close-complaint`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };
  export const riderComplReslovedDropDownApi = (params) => {
    return api.post(
      `/api/admin/rider/inprogress-complaint/drop-down-resolved-closed`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };
  export const driverComplReslovedDropDownApi = (params) => {
    return api.post(
      `/api/admin/driver/inprogress-complaint/drop-down-resolved-closed`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };
  