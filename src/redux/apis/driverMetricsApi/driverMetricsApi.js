import { api } from "../api";
export const driverMetricsListApi = (pageNo = 0,params) => {
    return api.post(
        `/api/driver/metrics/findall?page_no=0`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const driverMetricsViewApi = (pageNo = 0,params) => {
    return api.post(
        `/api/driver/metrics/findone`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const drimetDropDownListApi = (params) => {
    return api.post(
      "/api/driver/metrics/drop-down",
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };