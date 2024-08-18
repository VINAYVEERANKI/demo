import { api } from "./api";

export const sucessFulRefundListApi = (pageNo = 0, params) => {
    return api.post(
      `/api/refund/find-all-success-refund?page_no=${pageNo}`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const successFulRefundViewApi = (params) => {
    return api.post(
      `/api/refund/find-one-success-refund`,
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };

  export const sucesRefdropDownListApi = (params) => {
    return api.post(
      "/api/refund/successfull-dropdown-list",
      JSON.stringify(params),
      {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    );
  };